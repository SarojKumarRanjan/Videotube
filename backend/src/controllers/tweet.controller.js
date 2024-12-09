import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/errorHandler.js";
import { ApiResponse } from "../utils/responseHandler.js";
import { Tweet } from "./../models/tweet.model.js";
import { cloudinaryHandler,deleteOnCloudinary } from "../utils/cloudinary.js";

const addTweet = asyncHandler(async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) throw new ApiError(400, "Content is required");

    const userId = req?.user?._id;
    if (!isValidObjectId(userId)) throw new ApiError(400, "Invalid user ID");

    const tweetImage = req?.file?.path;
    let uploadedImage;
    if (tweetImage) {
       uploadedImage = await cloudinaryHandler(tweetImage);
       const tweet = await Tweet.create({
        content:content,
        owner: userId,
        tweetImage:uploadedImage.url,
      }); 
  
      if (!tweet) throw new ApiError(500, "Failed to create tweet");
      if (!uploadedImage) {
        throw new ApiError(500, "Failed to upload image");
      }
    }
/* console.log(tweetImage);
console.log(content);
console.log(userId);
 */

const tweet = await Tweet.create({
  content:content,
  owner: userId,
  
}); 

if (!tweet) throw new ApiError(500, "Failed to create tweet");


   
    return res
      .status(201)
      .json(new ApiResponse(201, tweet, "Tweet created successfully"));
  } catch (error) {
    throw new ApiError(400, error.message || " Error while creating tweet");
  }
});

const updateTweet = asyncHandler(async (req, res) => {
  try {
    const { tweetId } = req.params;
    if (!isValidObjectId(tweetId)) throw new ApiError(400, "Invalid tweet ID");
  
    const userId = req?.user?._id;
    if (!isValidObjectId(userId)) throw new ApiError(400, "Invalid user ID");
  
    const { content } = req?.body;
  
    if (!content || content.trim().length === 0) {
      throw new ApiError(400, "Comment content cannot be empty");
    }


  
    const tweet = await Tweet.findById(tweetId);
  
    if (!tweet) throw new ApiError(404, "Tweet not found");
  
    if (tweet.owner.toString() != userId.toString()) {
      throw new ApiError(403, "Unauthorized to update this tweet");
    }

    let tweetImage = tweet.tweetImage;
    //console.log("before new image",tweetImage);
    

    if (req?.file?.path) {
      if (tweet.tweetImage) {
        const deletedImage = await deleteOnCloudinary(tweet.tweetImage);
       // console.log("deleted image of the tweet",deletedImage);
        if (!deletedImage) {
          throw new ApiError(500, "Failed to delete image");
        }
      }
      
      const uploadedImage = await cloudinaryHandler(req.file.path);
      if (!uploadedImage) {
        throw new ApiError(500, "Failed to upload image");
      }
      tweetImage = uploadedImage;
    }

   // console.log("after new image",tweetImage);
    

    const updatedTweet = await Tweet.findByIdAndUpdate(
      tweetId,
      {
        $set: { content, tweetImage:tweetImage.url },
        
      },
      
    );
  
    if (!updatedTweet) throw new ApiError(500, "Failed to update tweet");
    return res
      .status(200)
      .json(new ApiResponse(200, updatedTweet, "Tweet updated successfully"));
  } catch (error) {
    throw new ApiError(400, error.message || "Error while updating tweet");
    
  }
});

const deleteTweet = asyncHandler(async (req, res) => {
    try {
    const { tweetId } = req.params;
    if (!isValidObjectId(tweetId)) throw new ApiError(400, "Invalid tweet ID");
    
    const userId = req?.user?._id;
    if (!isValidObjectId(userId)) throw new ApiError(400, "Invalid user ID");

    
    const tweet = await Tweet.findById(tweetId);

    
    if (!tweet) throw new ApiError(404, "Tweet not found");
    
    if (tweet.owner.toString() != userId.toString()) {
      throw new ApiError(403, "Unauthorized to delete this tweet");
    }

    if (tweet.tweetImage) {
      const deletedImage = await deleteOnCloudinary(tweet.tweetImage);
     // console.log("deleted image of the tweet",deletedImage);
      if (!deletedImage) {
        throw new ApiError(500, "Failed to delete image");
      }
    }



    
   const deletedTweet =  await Tweet.findByIdAndDelete(tweetId);
   if (!deletedTweet) throw new ApiError(500, "Failed to delete tweet");

    return res
     .status(200)
     .json(new ApiResponse(200, null, "Tweet deleted successfully"));
  } catch (error) {
    throw new ApiError(400, error.message || "Error while deleting tweet");
  }
})


const getUserTweets = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;
  
    if (!isValidObjectId(userId)) {
      throw new ApiError(400, "Invalid userId");
    }
  
    const aggregationPipeline = [
      {
        $match: {
          owner: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "ownerDetails",
          pipeline: [
            {
              $project: {
                userName: 1,
                avatar: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "tweet",
          as: "likeDetails",
          pipeline: [
            {
              $project: {
                likedBy: 1,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          likesCount: {
            $size: "$likeDetails",
          },
          ownerDetails: {
            $first: "$ownerDetails",
          },
          isLiked: {
            $cond: {
              if: { $in: [req.user?._id, "$likeDetails.likedBy"] },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $project: {
          content: 1,
          ownerDetails: 1,
          likesCount: 1,
          createdAt: 1,
          isLiked: 1,
        },
      },
    ];
  
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };
  
    const tweets = await Tweet.aggregatePaginate(
      Tweet.aggregate(aggregationPipeline),
      options
    );
  
    return res
      .status(200)
      .json(new ApiResponse(200, tweets, "Tweets fetched successfully"));
  });


  const getAllTweets = asyncHandler(async (req, res) => {
    const isGuest = !req.user?._id;

    console.log(req.user);
    
  
    const aggregationPipeline = [
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "ownerDetails",
          pipeline: [
            {
              $project: {
                userName: 1,
                avatar: 1,
              },
            },
          ],
        },
      },
      // First lookup to get all likes for counting
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "tweet",
          as: "allLikes"
        },
      },
      // Separate lookup to check if current user has liked
      {
        $lookup: {
          from: "likes",
          let: { tweetId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$tweet", "$$tweetId"] },
                    { $eq: ["$likedBy", req.user?._id] }
                  ]
                }
              }
            }
          ],
          as: "userLike"
        },
      },
      {
        $addFields: {
          likesCount: {
            $size: "$allLikes"
          },
          ownerDetails: {
            $first: "$ownerDetails"
          },
          isLiked: {
            $cond: {
              if: isGuest,
              then: false,
              else: {
                $gt: [{ $size: "$userLike" }, 0]
              }
            }
          }
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $project: {
          content: 1,
          ownerDetails: 1,
          likesCount: 1,
          createdAt: 1,
          isLiked: 1,
          tweetImage: 1,
        },
      },
    ];
  
    const tweets = await Tweet.aggregate(aggregationPipeline);
  
    return res
      .status(200)
      .json(new ApiResponse(200, tweets, "Tweets fetched successfully"));
});
  export {
    addTweet,
    updateTweet,
    deleteTweet,
    getUserTweets,
    getAllTweets,
  }