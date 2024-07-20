import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/errorHandler.js";
import { User } from "./../models/user.model.js";
import { cloudinaryHandler, deleteOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/responseHandler.js";
import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { Like } from "../models/like.model.js";
import { Comment } from "../models/comment.model.js";

// get the video details of the user to upload

const publishVideo = asyncHandler(async (req, res) => {
  try {
    const { title, description, isPublished = true } = req.body;

    if (!(title.trim() || description.trim())) {
      throw new ApiError(400, "Please provide title and description");
    }

    // another way to check for the undefined values after trim
    /* 
  if (
    [title, description, isPublished].some(
      (field) => field === undefined || field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  } */

    // upload video and thumbnail to cloudinary

    const videoLocalPath = req.files?.videoFile[0]?.path;

    if (!videoLocalPath) {
      throw new ApiError(400, "Please provide video file");
    }

    const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

    if (!thumbnailLocalPath) {
      throw new ApiError(400, "Please provide thumbnail file");
    }

    const videoUploadResponse = await cloudinaryHandler(
      videoLocalPath,
      "video"
    );

    if (!videoUploadResponse) {
      throw new ApiError(400, "Video upload failed on cloudinary");
    }

    const thumbnailUploadResponse = await cloudinaryHandler(
      thumbnailLocalPath,
      "image"
    );

    if (!thumbnailUploadResponse) {
      throw new ApiError(400, "Thumbnail upload failed on cloudinary");
    }

    // now save all the details in db

    const video = await Video.create({
      videoFile:videoUploadResponse?.url,
      thumbnail: thumbnailUploadResponse?.url,

      title,
      description,
      isPublished,
      owner: req.user?._id,
      duration: videoUploadResponse?.duration,
    });

    if (!video) {
      throw new ApiError(400, "Video upload failed");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, video, "video uploaded successfully"));
  } catch (error) {
    throw new ApiError(500, "An error occurred while uploading your video");
  }
});

//get all the videos on the basis of query  parameter

/* const getAllVideo = asyncHandler(async (req, res) => {
 try {
   const { page = 1, limit = 15, query, sortBy, sortType, userId } = req?.query;
 
   const pipeLine = [];

   //TODO: search query based on the title and description of the video by creating a index from the mongodb atlas
 
 
   if(userId){
 
     if (!isValidObjectId(userId)) {
       throw new ApiError(400, "Invalid user id");
     }
   
     const user = await User.findById(userId);
   
     if (!user) {
       throw new ApiError(400, "User not found");
     }
 
     pipeLine.push({ $match: { owner: mongoose.Types.ObjectId(userId) } });
 
   }
 
   // videos which are set as public 
 
 
   pipeLine.push({ $match: { isPublished: true } });
 
   //based on sorttype and sortby
 
   if (sortBy && sortType) {
     pipeLine.push({ $sort: { [sortBy]: sortType === "desc"? -1 : 1 } });
   }else{
     pipeLine.push({ $sort: { createdAt: -1 } });
   }
 
   pipeLine.push(
     {
     $lookup:{
       from: "users",
       localField: "owner",
       foreignField: "_id",
       as: "ownerDetails",
       pipeLine:[
         {
           $project:{
             _id: 1,
             username: 1,
             avatar: 1
           }
         }
       ]
     }
   },
 {
   $unwind: "$ownerDetails",
 });
 
 const videoAggregator = Video.aggregate(pipeLine);
 
 const options = {
   page: parseInt(page),
   limit: parseInt(limit),
   
 }
 
 const videos = await Video.aggregatePaginate(videoAggregator, options);
 
 return res.status(200).json(new ApiResponse(200, videos, "videos fetched successfully"));
 } catch (error) {
  
   throw new ApiError(500, "An error occurred while fetching videos based on query parameters");
 }
  
}); */





const getAllVideo = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 15, query, sortBy, sortType, userId } = req?.query;
    
   // console.log("Query parameters:", { page, limit, query, sortBy, sortType, userId });

    const pipeLine = [];

    // TODO: search query based on the title and description of the video by creating an index from the mongodb atlas

    if (userId) {
     // console.log("Filtering by userId:", userId);

      if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user id");
      }
    
      const user = await User.findById(userId);
      //console.log("User found:", user ? "Yes" : "No");
    
      if (!user) {
        throw new ApiError(400, "User not found");
      }

      pipeLine.push({ $match: { owner: new mongoose.Types.ObjectId(userId) } });
    }

    // Stage 1: Match published videos
    pipeLine.push({ $match: { isPublished: true } });
    //console.log("Pipeline after isPublished match:", pipeLine);

    // Stage 2: Sorting
    if (sortBy && sortType) {
      pipeLine.push({ $sort: { [sortBy]: sortType === "desc" ? -1 : 1 } });
    } else {
      pipeLine.push({ $sort: { createdAt: -1 } });
    }
   // console.log("Pipeline after sorting:", pipeLine);

    // Stage 3: Lookup user details
    pipeLine.push(
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "ownerDetails",
          pipeline: [
            {
              $project: {
                _id: 1,
                userName: 1,
                avatar: 1
              }
            }
          ]
        }
      },
      {
        $unwind: "$ownerDetails",
      }
    );
   // console.log("Pipeline after user lookup:", pipeLine);

    // Execute pipeline without pagination to check intermediate results
    const intermediateResults = await Video.aggregate(pipeLine);
    console.log("Intermediate results (first 5):", intermediateResults.slice(0, 5));

    const videoAggregator = Video.aggregate(pipeLine);

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    }

    console.log("Pagination options:", options);

    const videos = await Video.aggregatePaginate(videoAggregator, options);
    console.log("Final paginated results (first 5):", videos.docs.slice(0, 5));

    return res.status(200).json(new ApiResponse(200, videos, "videos fetched successfully"));
  } catch (error) {
    console.error("Error in getAllVideo:", error);
    throw new ApiError(500, "An error occurred while fetching videos based on query parameters");
  }
});


/* 

this endpoint will return these fields

1.videoFile => url,
2.title,
3.description,
4.isPublished,
5.owner,
6.duration,
7.createdAt,
8.views
9.comments,
10.likescount,
11.issubscribed,
12.isLiked,
13.subscriberCount
*/
const getVideoById = asyncHandler(async (req, res) => {
  try {
    
    const { id } = req.params;

    if (!id) {
      throw new ApiError(400, "Video id is required");
    }

    if (!isValidObjectId(id)) {
      throw new ApiError(400, "Invalid video id");
    }

    const isGuest = !req?.user?._id;

  /*   // Stage 1: Match
    const stage1 = await Video.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      }
    ]);
    console.log("Stage 1 (Match) result:", stage1);

    // Stage 2: Lookup users
    const stage2 = await Video.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
          pipeline: [
            {
              $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers",
              },
            },
            {
              $addFields: {
                subscriberCount: { $size: "$subscribers" },
                isSubscribed: {
                  $cond: {
                    if: isGuest,
                    then: false,
                    else: {
                      $cond: {
                        if: {
                          $in: [req.user?._id, "$subscribers.subscriber"],
                        },
                        then: true,
                        else: false,
                      },
                    },
                  },
                },
              },
            },
            {
              $project: {
                userName: 1,
                fullName: 1,
                avatar: 1,
                subscriberCount: 1,
                isSubscribed: 1,
              },
            },
          ],
        },
      }
    ]);
    console.log("Stage 2 (Lookup users) result:", stage2);

    // Stage 3: Lookup likes
    const stage3 = await Video.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
          pipeline: [
            {
              $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers",
              },
            },
            {
              $addFields: {
                subscriberCount: { $size: "$subscribers" },
                isSubscribed: {
                  $cond: {
                    if: isGuest,
                    then: false,
                    else: {
                      $cond: {
                        if: {
                          $in: [req.user?._id, "$subscribers.subscriber"],
                        },
                        then: true,
                        else: false,
                      },
                    },
                  },
                },
              },
            },
            {
              $project: {
                userName: 1,
                fullName: 1,
                avatar: 1,
                subscriberCount: 1,
                isSubscribed: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "video",
          as: "likes",
        },
      }
    ]);
    console.log("Stage 3 (Lookup likes) result:", stage3);

    // Stage 4: Add fields
    const stage4 = await Video.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
          pipeline: [
            {
              $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers",
              },
            },
            {
              $addFields: {
                subscriberCount: { $size: "$subscribers" },
                isSubscribed: {
                  $cond: {
                    if: isGuest,
                    then: false,
                    else: {
                      $cond: {
                        if: {
                          $in: [req.user?._id, "$subscribers.subscriber"],
                        },
                        then: true,
                        else: false,
                      },
                    },
                  },
                },
              },
            },
            {
              $project: {
                userName: 1,
                fullName: 1,
                avatar: 1,
                subscriberCount: 1,
                isSubscribed: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "video",
          as: "likes",
        },
      },
      {
        $addFields: {
          likesCount: { $size: "$likes" },
          owner: {
            $first: "$owner",
          },
          isLiked: {
            $cond: {
              if: isGuest,
              then: false,
              else: {
                $cond: {
                  if: {
                    $in: [req.user?._id, "$likes.likedBy"],
                  },
                  then: true,
                  else: false,
                },
              },
            },
          },
        },
      }
    ]);
    console.log("Stage 4 (Add fields) result:", stage4); */

    // Final stage: Project
    const video = await Video.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
          pipeline: [
            {
              $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers",
              },
            },
            {
              $addFields: {
                subscriberCount: { $size: "$subscribers" },
                isSubscribed: {
                  $cond: {
                    if: isGuest,
                    then: false,
                    else: {
                      $cond: {
                        if: {
                          $in: [req.user?._id, "$subscribers.subscriber"],
                        },
                        then: true,
                        else: false,
                      },
                    },
                  },
                },
              },
            },
            {
              $project: {
                userName: 1,
                fullName: 1,
                avatar: 1,
                subscriberCount: 1,
                isSubscribed: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "video",
          as: "likes",
        },
      },
      {
        $addFields: {
          likesCount: { $size: "$likes" },
          owner: {
            $first: "$owner",
          },
          isLiked: {
            $cond: {
              if: isGuest,
              then: false,
              else: {
                $cond: {
                  if: {
                    $in: [req.user?._id, "$likes.likedBy"],
                  },
                  then: true,
                  else: false,
                },
              },
            },
          },
        },
      },
      {
        $project: {
          videoFile: 1,
          title: 1,
          description: 1,
          owner: {
            _id: 1,
            userName: 1,
            fullName: 1,
            avatar: 1,
          },
          duration: 1,
          createdAt: 1,
          views: 1,
          comments: 1,
          likesCount: 1,
          isLiked: 1,
          subscriberCount: 1,
          isSubscribed: 1,
        },
      },
    ]);
    console.log("Final stage (Project) result:", video);

    if (!video.length) {
      throw new ApiError(404, "Video not found");
    }
      
    // Increment views using an update operation
    await Video.findByIdAndUpdate(video[0]._id, { $inc: { views: 1 } });
  
      return res.status(200).json(new ApiResponse(200, video[0], "Video fetched successfully"));
  } catch (error) {
    throw new ApiError(500, "An error occurred while fetching your video");
  }
});

// to update the video and its properties such as title , thumbnail,description, etc

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video id");
  }

  const currentVideo = await Video.findById({
    _id: videoId,
  });
  if (!currentVideo) {
    throw new ApiError(404, "Video not found");
  }
  if (!req.user || req.user._id.toString() !== currentVideo.owner.toString()) {
    throw new ApiError(401, "Unauthorized to update this video");
  }

  const { title, description } = req.body;
  

  if (
    [title, description].some(
      (field) => field === undefined || field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "Title and description are required");
  }

  let update = {
    $set: {
      title,
      description,
    },
  };

  // if thumbnail is present then first upload the thumbnail on cloudinary
  // and then delete the previous thumbnail from the cloudinary by providing the url of the thumbnail
  if(req?.files?.thumbnail){
    const thumbnailLocalPath = req?.files?.thumbnail[0]?.path;

    if (thumbnailLocalPath) {
      const thumbnailUploadResponse = await cloudinaryHandler(
        thumbnailLocalPath,
        "image"
      );
  
      if (!thumbnailUploadResponse) {
        throw new ApiError(400, "Thumbnail upload failed on cloudinary");
      }
  
      const deletethumbnail = await deleteOnCloudinary(currentVideo.thumbnail);
  
      if (!deletethumbnail) {
        throw new ApiError(
          400,
          "Failed to delete the existing thumbnail from cloudinary"
        );
      }
  
      update.$set.thumbnail = thumbnailUploadResponse.url;
    }
  }
  

  const video = await Video.findByIdAndUpdate(videoId, update, {
    new: true,
  });

  if (!video) throw new ApiError(501, "Updating Video failed");

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video updated successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
 
  try {
    const { videoId } = req.params;
   // console.log("VideoId from params:", videoId);

    if (!isValidObjectId(videoId)) {
      
      throw new ApiError(400, "Invalid video id");
    }

   
    const currentVideo = await Video.findById(videoId);
   // console.log("Video found:", currentVideo);

    if (!currentVideo) {
      console.log("Video not found");
      throw new ApiError(404, "Video not found");
    }

  
   // console.log("req.user:", req.user);
   // console.log("currentVideo.owner:", currentVideo.owner);
    if (
      !req.user ||
      req.user._id.toString() !== currentVideo.owner.toString()
    ) {
     
      throw new ApiError(401, "Unauthorized to delete this video");
    }

   
    const deleteVideo = await Video.findByIdAndDelete(videoId);
   

    if (!deleteVideo) {
    
      throw new ApiError(501, "Deleting Video failed");
    }

   
    const deleteVideoFromCloudinary = await deleteOnCloudinary(
      currentVideo.videoFile,
      "video"
    );
  

    if (!deleteVideoFromCloudinary) {
    //  console.log("Failed to delete video from Cloudinary");
      throw new ApiError(
        400,
        "Failed to delete the existing video from cloudinary"
      );
    }

  
    const deleteThumbnailFromCloudinary = await deleteOnCloudinary(
      currentVideo.thumbnail,
      "image"
    );
  //  console.log("Cloudinary thumbnail delete result:", deleteThumbnailFromCloudinary);

    if (!deleteThumbnailFromCloudinary) {
    
      throw new ApiError(
        400,
        "Failed to delete the existing thumbnail from cloudinary"
      );
    }

  
     await Like.deleteMany({ video: videoId });
 

  
    await Comment.deleteMany({ video: videoId });
  

  
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Video deleted successfully"));
  } catch (error) {
    
    throw new ApiError(500, "An error occurred while deleting your video: " + error.message);
  }
});
const togglePublishButton = asyncHandler(async (req, res) => {
  try {
    const { videoId } = req.params;
    if (!isValidObjectId(videoId)) {
      throw new ApiError(400, "Invalid video id");
    }
    const currentVideo = await Video.findById({
      _id: videoId,
    });

    if (!currentVideo) {
      throw new ApiError(404, "Video not found");
    }

    if (
      !req.user ||
      req.user._id.toString() !== currentVideo.owner.toString()
    ) {
      throw new ApiError(401, "Unauthorized to publish/unpublish this video");
    }

    currentVideo.isPublished = !currentVideo.isPublished;

    await currentVideo.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(
        new ApiResponse(200, currentVideo, "Video status updated successfully")
      );
  } catch (error) {
    throw new ApiError(500, "An error occurred while updating video status");
  }
});

const updateWatchHistory = asyncHandler(async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      throw new ApiError(401, "User not authenticated");
    }
    if (!isValidObjectId(videoId)) {
      throw new ApiError(400, "Invalid video id");
    }

    const currentVideo = await Video.findById(videoId);
    if (!currentVideo) {
      throw new ApiError(404, "Video not found");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const watchHistoryEntry = user.watchHistory.some((value) => {
      //console.log(value.toString(), " == ", videoId.toString());
      return value.toString() === videoId.toString();
    });

   // console.log("watchHistoryEntry", watchHistoryEntry);

    if (watchHistoryEntry) {
      throw new ApiError(400, "Video already in watch history");
    }

    user.watchHistory.push(currentVideo._id);
    await user.save({ validateBeforeSave: false });

    const updatedUser = await User.findById(userId).select('-password -refreshToken');

    return res
      .status(200)
      .json(new ApiResponse(200, updatedUser, "Video added to watch history"));
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(new ApiResponse(error.statusCode, null, error.message));
    }
    console.error(error);
    return res.status(500).json(new ApiResponse(500, null, "An error occurred while updating watch history"));
  }
});


// TODO: Endpoint to get next video 

export {
  publishVideo,
  getAllVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishButton,
  updateWatchHistory
};

