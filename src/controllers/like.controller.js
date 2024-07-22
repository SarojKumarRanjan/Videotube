import { Like } from './../models/like.model.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import  { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/errorHandler.js";
import { ApiResponse } from "../utils/responseHandler.js";


const toggleVIdeoLike = asyncHandler(async(req,res) =>{
   try {
     const userId = req.user?._id;
     const {videoId} = req?.params
 
     if(!isValidObjectId(videoId)){
         throw new ApiError(400,"Invalid video ID");
     }
 
     const likedVideo = await Like.findOne({video:videoId,likedBy:userId})
 
     if(likedVideo){
         await Like.findByIdAndDelete(likedVideo._id)
         return res.status(200).json(
             new ApiResponse(200,null,"video unliked")
         )
     }else{
         const newLike = new Like({video:videoId,likedBy:userId})
         await newLike.save({validateBeforeSave:false})
         return res.status(200).json( new ApiResponse(200,null,"video liked"))
     }
   } catch (error) {
     throw new ApiError(500,error.message+" error in video like");
    
   }

})


const toggleCommentLike = asyncHandler(async(req,res)=> {
    // Logic to toggle comment like goes here
    // Retrieve user, comment id from request parameters
    // Check if user is authenticated
    // Check if comment id is valid
    // Find the comment in the database
    // Find the like for the comment by the user
    // If like exists, delete it
    // If like does not exist, create a new like

   try {
     const {commentId} = req.params;
     if(!isValidObjectId(commentId)){
         throw new ApiError(400,"Invalid comment ID");
     }
     const userId = req?.user?._id;
 
     const commentLike = await Like.findOne({comment:commentId,likedBy:userId})
 
     if(commentLike){
         await Like.findByIdAndDelete(commentLike._id)
         return res.status(200).json(
             new ApiResponse(200,null,"comment unliked")
         )
     }else{
         const newLike = new Like({comment:commentId,likedBy:userId})
         await newLike.save({validateBeforeSave:false})
         return res.status(200).json(new ApiResponse(200,null,"comment liked"))
     }
   } catch (error) {
     throw new ApiError(500,error.message+" error in comment like");
    
   }
 });

 const toggleTweetLike = asyncHandler(async(req,res) => {
    // Logic to toggle tweet like goes here
    // Retrieve user, tweet id from request parameters
    // Check if user is authenticated
    // Check if tweet id is valid
    // Find the tweet in the database
    // Find the like for the tweet by the user
    // If like exists, delete it
    // If like does not exist, create a new like

    try {
        const {tweetId} = req.params;
        if(!isValidObjectId(tweetId)){
            throw new ApiError(400,"Invalid tweet ID");
        }
        const userId = req?.user?._id;
    
        const tweetLike = await Like.findOne({tweet:tweetId,likedByUser:userId});
    
        if(tweetLike){
            await Like.findByIdAndDelete(tweetLike._id)
            return res.status(200   ).json(
                new ApiResponse(200,null,"tweet unliked")
            )
        }else{
            const newLike = new Like({tweet:tweetId,likedBy:userId})
            await newLike.save({validateBeforeSave:false})
            return res.status(200).json(
                new ApiResponse(200,null,"tweet liked")
            )
        }
    } catch (error) {
        throw new ApiError(500,error.message+" error in tweet like");
        
    }
 })


 const getLikedVideo = asyncHandler(async(req,res)=>{
    // Logic to get liked videos goes here
    // Retrieve user id from request parameters
    // Find all likes where the user has liked a video
    // Fetch the video details for each like
    // Return an array of video details
    try {

        const userId = req.user?._id;
        const likedVideos = await Like.aggregate([
            {
                $match:{likedBy:userId}
            },
            {
                $lookup:{
                    from:"videos",
                    localField:"video",
                    foreignField:"_id",
                    as:"likedVideo",
                    pipeline:[
                        {
                            $match:{
                                isPublished: true 
                            }
                        },
                        {
                            $lookup:{
                                from:"users",
                                localField:"owner",
                                foreignField:"_id",
                                as:"ownerDetails"
                            }
                        },
                        {
                            $unwind:"$ownerDetails"
                        }
                    ]
                }
            },
            {
                $unwind:"$likedVideo"
            },
            {
                $sort:{
                    createdAt: -1
                }
            },
            {
                $project: {
                    _id: 0,
                    likedVideo: {
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
                      ownerDetails: {
                        userName: 1,
                        fullName: 1,
                        avatar: 1,
                      },
                    },
                  },
            }

        ]);

        if (!likedVideos) {
            throw new ApiError(404, "error in finding liked videos");
            
        }

        return res.status(200).json(
            new ApiResponse(200,likedVideos,"Liked videos")
        )
        


        
    } catch (error) {
        throw new ApiError(500,error.message || " error in getting liked videos");
        
    }
 })

 

 export {
     toggleVIdeoLike,
     toggleCommentLike,
     toggleTweetLike,
     getLikedVideo,
 }

