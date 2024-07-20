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

const getAllVideo = asyncHandler(async (req, res) => {
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
    const { videoId } = req.params;

    const isGuest = !req.user;

    if (!videoId) {
      throw new ApiError(400, "Video id is required");
    }

    if (!isValidObjectId(videoId)) {
      throw new ApiError(400, "Invalid video id");
    }

    const video = await Video.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(videoId) },
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
                          $in: [req.user._id, "$subscribers.subscriber"],
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
                    $in: [req.user._id, "$likes.likedBy"],
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

    if (!video.length) {
      throw new ApiError(404, "Video not found");
    }

    video[0].views += 1;

    await video[0].save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, video[0], "video fetched successfully"));
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

  const currentVideo = await findById({
    _id: videoId,
  });
  if (!currentVideo) {
    throw new ApiError(404, "Video not found");
  }
  if (!req.user || req.user._id.toString() !== currentVideo.owner.toString()) {
    throw new ApiError(401, "Unauthorized to update this video");
  }

  const { title, description } = req.body;
  const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

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

    if (!isValidObjectId(videoId)) {
      throw new ApiError(400, "Invalid video id");
    }

    const currentVideo = await findById({
      _id: videoId,
    });
    if (!currentVideo) {
      throw new ApiError(404, "Video not found");
    }
    if (
      !req.user ||
      req.user._id.toString() !== currentVideo.owner.toString()
    ) {
      throw new ApiError(401, "Unauthorized to delete this video");
    }

    const deleteVideo = await Video.findByIdAndDelete(videoId);

    if (!deleteVideo) throw new ApiError(501, "Deleting Video failed");

    // delete the video from cloudinary by providing the url of the video file
    const deleteVideoFromCloudinary = await deleteOnCloudinary(
      currentVideo.videoFile
    );
    if (!deleteVideoFromCloudinary) {
      throw new ApiError(
        400,
        "Failed to delete the existing video from cloudinary"
      );
    }

    // delete the thumbnail from cloudinary by providing the url of the thumbnail file

    const deleteThumbnailFromCloudinary = await deleteOnCloudinary(
      currentVideo.thumbnail
    );
    if (!deleteThumbnailFromCloudinary) {
      throw new ApiError(
        400,
        "Failed to delete the existing thumbnail from cloudinary"
      );
    }

    // delete the likes and coments related to this video

    const deleteLikes = await Like.deleteMany({ video: videoId });
    if (!deleteLikes) {
      throw new ApiError(400, "Failed to delete likes related to this video");
    }

    const deleteComments = await Comment.deleteMany({ video: videoId });
    if (!deleteComments) {
      throw new ApiError(
        400,
        "Failed to delete comments related to this video"
      );
    }

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Video deleted successfully"));
  } catch (error) {
    throw new ApiError(500, "An error occurred while deleting your video");
  }
});

const togglePublishButton = asyncHandler(async (req, res) => {
  try {
    const { videoId } = req.params;
    if (!isValidObjectId(videoId)) {
      throw new ApiError(400, "Invalid video id");
    }
    const currentVideo = await findById({
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

const updateWatchHistory = asyncHandler( async(req,res)=>{
  //  logic to update the watch history for the user when a video is viewed
  // 1. check if the user is authenticated
  // 2. check if the video id is valid
  // 3. check if the video exists
  // 4. check if the user is authorized to update the watch history
  // 5. check if the video is already in the user's watch history
  // 6. if not, add the video id to the user's watch history
  

 try {
   const { videoId } = req.params;
   const userId = req.user?._id;
 
   if (!userId) {
     throw new ApiError(401, "User not authenticated");
   }
   if (!isValidObjectId(videoId)) {
     throw new ApiError(400, "Invalid video id");
   }
   const currentVideo = await findById({
     _id: videoId,
   });
 
   if (!currentVideo) {
     throw new ApiError(404, "Video not found");
   }
 
   if (
    !req.user ||
    userId.toString()!== currentVideo.owner.toString()
   ) {
     throw new ApiError(401, "Unauthorized to update watch history");
   }
 
   // check if already exist or not 
 
   const user = await User.findById(userId);
 
   const watchHistoryEntry = user.watchHistory.find(
     (entry) => entry.video.toString() === videoId
   );
 
   // add to watch history
 
   if (!watchHistoryEntry) {
     user.watchHistory.push({ video: currentVideo._id });
   }
 
   await user.save({ validateBeforeSave: false });
 
   return res
    .status(200)
    .json(new ApiResponse(200, user, "Video added to watch history"));
 } catch (error) {
  
   throw new ApiError(500, "An error occurred while updating watch history");
 }

})

// TODO: Endpoit to get next video 

export {
  publishVideo,
  getAllVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishButton,
  updateWatchHistory
};

