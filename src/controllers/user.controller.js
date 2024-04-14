import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/errorHandler.js";
import { User } from "./../models/user.model.js";
import { cloudinaryHandler } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/responseHandler.js";


const generateAccessTokenAndrefreshToken = async(userId) =>{
try {
  const user =  await User.findById(userId)
  const accessToken = user.generateAccessToken()
  const refreshToken = user.generateRefreshToken()

  user.refreshToken = refreshToken

 await user.save({validateBeforeSave:false})

 return {accessToken,refreshToken}
} catch (error) {
   throw new ApiError(500,"something went wrong while generating access and refresh tokens ")
}
}

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
 try{
   
 const {email,userName,password} = req.body

 //console.log(email,password);
 if (!userName && !email) {
    throw new ApiError(400,"email or userName is required")
 }
 
 
 
  const currentUser  = await User.findOne( {
    $or:[{userName},{email}]
 })
 
 if (!currentUser) {
    throw new ApiError(404,"user does not exist")
 }
 
 const isPasswordValid =  await currentUser.isPasswordCorrect(password)
 
 if (!isPasswordValid) {
    throw new ApiError(401,"Invalid password please check your password")
 }
 
 const {accessToken,refreshToken} = await generateAccessTokenAndrefreshToken(currentUser._id)
 
 const loggedInUser = await User.findById(currentUser._id).select(["-password","-refreshToken"])
 
 const options = {
    httpOnly:true,
    secure:true
 }
 
 return res
 .status(200)
 .cookie("accessToken",accessToken,options)
 .cookie("refreshToken",refreshToken,options)
 .json(new ApiResponse(
    200,
    {
       user:loggedInUser,accessToken,refreshToken
    },
    "user loggedIn successfully"
 ))
 
  } catch (error) {
   throw new ApiError(500,"An Error occured while logging in user")
  }

});

const logoutUser = asyncHandler(async(req,res) => {
 await User.findByIdAndUpdate(req.user._id,{
   $set:{
      refreshToken:undefined
   }
 },
 {
   new:true
 })
 const options = {
   httpOnly:true,
   secure:true
}

return res
.status(200)
.clearCookie("accessToken",options)
.clearCookie("refreshToken",options)
.json(
   new ApiResponse(200,{},"user logged out successfully")
)
})


export  {registerUser,loginUser,logoutUser};
