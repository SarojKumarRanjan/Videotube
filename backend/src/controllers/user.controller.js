import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/errorHandler.js";
import { User } from "./../models/user.model.js";
import { cloudinaryHandler, deleteOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/responseHandler.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessTokenAndrefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating access and refresh tokens "
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, userName, password } = req.body;

 

  if (
    [fullName, email, userName, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ email }, { userName }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists with same username or email");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  //const coverImageLocalPath = req.files?.coverImage[0]?.path

  let coverImageLocalPath;

  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar is required");
  }

  const avatar = await cloudinaryHandler(avatarLocalPath);
  const coverImage = await cloudinaryHandler(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "avatar is required");
  }

  const user = await User.create({
    userName: userName.toLowerCase(),
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    password,
    email,
  });

 
  

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

 
  

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  //TODO
  // get email and password from the frontend
  //check if the either of the field is empty  if throw error
  //now compare the given fields from the database with the help of bcrypt
  //genrate tokens
  // if everything goes well return thr response by removing the password and resfresh token fields
  try {
    const {email, userName,  password } = req.body;

    
    if (!userName && !email) {
      throw new ApiError(400, "email or userName is required");
    }

    //console.log(userName,password);

    const currentUser = await User.findOne({
      $or: [{ userName }, { email }],
    });

    //console.log(currentUser);

    if (!currentUser) {
      throw new ApiError(404, "user does not exist");
    }

    

    const isPasswordValid = await currentUser.isPasswordCorrect(password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid password please check your password");
    }

    const { accessToken, refreshToken } =
      await generateAccessTokenAndrefreshToken(currentUser._id);

      

    const loggedInUser = await User.findById(currentUser._id).select([
      "-password",
      "-refreshToken",
    ]);

    const options = {
      httpOnly: true,
  secure: true,
  sameSite: "none"
      
      
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
            accessToken,
            refreshToken,
          },
          "user loggedIn successfully"
        )
      );
  } catch (error) {
    throw new ApiError(500, "An Error occured while logging in user");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  const options = {
   httpOnly: true,
  secure: true,
  sameSite: "none"
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req?.cookies?.refreshToken || req?.body?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthroized request");
  }

  try {
    const decodedIncomingRefreshToken = jwt.verify(
      incomingRefreshToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedIncomingRefreshToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refreshToken");
    }

 

    if (incomingRefreshToken != user?.refreshToken) {
      throw new ApiError(401, "Refresh token expired please login again");
    }

    const options = {
      httpOnly: true,
  secure: true,
  sameSite: "none"
    };

    const { accessToken, refreshToken } =
      await generateAccessTokenAndrefreshToken(user?._id);

    res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
           
          },
          "refreshToken matched successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
        error?.message
    );
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req?.body;

  const user = await User.findById(req?.user?._id);

  const isPasswordCorrect = await user.isPasswordCorrect(currentPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Current password is incorrect");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentuser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "current user fetched successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { email, userName, fullName } = req.body;

  if (!(email || userName || fullName)) {
    throw new ApiError(400, "Please provide email,userName or fullName");
  }

  const user = req?.user?._id;

  const updatedUser = await User.findByIdAndUpdate(
    user,
    {
      $set: {
        email,
        userName,
        fullName,
      },
    },
    {
      new: true,
    }
  ).select("-password");

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedUser, "Account details updated successfully")
    );
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Please provide avatar");
  }

  const oldImage = req?.user?.avatar;
  if (!oldImage) {
    throw new ApiError(
      400,
      "error while finding the url for deleting the current avatar from cloudinary"
    );
  }

 const deletedAvatar =  await deleteOnCloudinary(oldImage)

 if (!deletedAvatar) {
  throw new ApiError(
    400,
    "error while deleting the current avatar from cloudinary"
  );
 }

  const avatar = await cloudinaryHandler(avatarLocalPath);

  if (!avatar.url) {
    throw new ApiError(400, "Avatar upload failed on cloudinary");
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    {
      new: true,
    }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Avatar updated successfully"));
});

const updateUserCoverImage = asyncHandler(async (req, res) => {
  const coverImageLocalPath = req.file?.path;

  if (!coverImageLocalPath) {
    throw new ApiError(400, "Please provide cover image");
  }

  const oldImage = req?.user?.coverImage;
  if (!oldImage) {
    throw new ApiError(
      400,
      "error while finding the url for deleting the current coverImage from cloudinary"
    );
  }

 const deletedcoverImage =  await deleteOnCloudinary(oldImage)

 if (!deletedcoverImage) {
  throw new ApiError(
    400,
    "error while deleting the current coverImage from cloudinary"
  );
 }


  const coverImage = await cloudinaryHandler(coverImageLocalPath);

  if (!coverImage.url) {
    throw new ApiError(
      400,
      "Avatar upload failed on cloudinary for cover image"
    );
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        coverImage: coverImage.url,
      },
    },
    {
      new: true,
    }
  ).select("-password");

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedUser, "Cover Image updated successfully")
    );
});

const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { userId } = req?.params;

  // Validate userId
  if (!userId) {
      throw new ApiError(400, "Please provide a valid userId");
  }

  try {
      const channel = await User.aggregate([
          // Match the specific user by ID
          {
              $match: {
                  _id: new mongoose.Types.ObjectId(userId)
              }
          },
          // Lookup subscribers
          {
              $lookup: {
                  from: "subscriptions",
                  localField: "_id",
                  foreignField: "channel",
                  as: "subscribersofmychannel"
              }
          },
          // Lookup channels this user is subscribed to
          {
              $lookup: {
                  from: "subscriptions",
                  localField: "_id",
                  foreignField: "subscriber",
                  as: "subscribedTo"
              }
          },
          // Add computed fields
          {
              $addFields: {
                  subscribersCount: { $size: "$subscribersofmychannel" },
                  subscribedToCount: { $size: "$subscribedTo" },
                  isSubscribed: {
                      $cond: {
                          if: { $in: [req.user?._id, "$subscribersofmychannel.subscriber"] },
                          then: true,
                          else: false
                      }
                  }
              }
          },
          // Project only required fields
          {
              $project: {
                  email: 1,
                  fullName: 1,
                  userName: 1,
                  subscribersCount: 1,
                  subscribedToCount: 1,
                  isSubscribed: 1,
                  avatar: 1,
                  coverImage: 1
              }
          }
      ]);

      // Check if channel exists
      if (!channel?.length) {
          throw new ApiError(404, "Channel does not exist");
      }

      // Return the channel data
      return res.status(200).json(
          new ApiResponse(200, channel[0], "Channel data fetched successfully")
      );

  } catch (error) {
      throw new ApiError(500, error.message || "Error in getting channel data");
  }
});
const getWatchHistory = asyncHandler(async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const watchHistory = await User.aggregate([
      {
        $match: { _id: userId }
      },
      {
        $lookup: {
          from: "videos",
          localField: "watchHistory",
          foreignField: "_id",
          as: "watchHistory",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "ownerDetails",
                pipeline: [
                  {
                    $project: {
                      fullName: 1,
                      userName: 1,
                      avatar: 1
                    }
                  }
                ]
              }
            },
            {
              $unwind: "$ownerDetails"
            },
            {
              $project: {
                _id: 1,
                videoFile: 1,
                thumbnail: 1,
                owner: 1,
                title: 1,
                description: 1,
                views: 1,
                duration: 1,
                createdAt: 1,
                isPublished: 1,
                ownerDetails: 1
              }
            }
          ]
        }
      },
      {
        $project: {
          _id: 0,
          watchHistory: 1
        }
      },
      {
        $unwind: "$watchHistory"
      },
      {
        $replaceRoot: { newRoot: "$watchHistory" }
      },
      {
        $sort: {
          createdAt: 1
        }
      }
    ]);

    if (!watchHistory) {
      throw new ApiError(404, "Error in finding watch history");
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        watchHistory,
        "Watch history fetched successfully"
      )
    );
  } catch (error) {
    throw new ApiError(500, error.message || "Error in getting watch history");
  }
});


export {
  getCurrentuser,
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile,
  getWatchHistory,
};
