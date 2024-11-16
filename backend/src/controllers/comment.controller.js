import { Comment } from './../models/comment.model.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose,{ isValidObjectId } from "mongoose";
import { ApiError } from "../utils/errorHandler.js";
import { ApiResponse } from "../utils/responseHandler.js";
import { Video } from '../models/video.model.js';


const addComment = asyncHandler(async(req,res)=>{

  console.log(req.body);
  
   try {
     const userId  = req?.user?._id;
     if(!userId){
         throw new ApiError(401, 'Unauthorized');
     }
 
     const {videoId} = req.params;
     if(!isValidObjectId(videoId)){
         throw new ApiError(400, 'Invalid Video ID');
     }
     const {content} = req?.body;
 
     if(!content || content.trim().length === 0){
         throw new ApiError(400, 'Comment content cannot be empty');
     }
 
     const comment = await Comment.create({
         content:content,
         video:videoId,
         owner:userId
     })
 
     if (!comment) {
         throw new ApiError(500, 'Failed to create comment');
         
     }
 
     return res.status(201).json(
         new ApiResponse(201, comment,"Comment created successfully")
     )
   } catch (error) {
    throw new ApiError( 500,error.message || "Error creating comment")
    

   }
});

const updateComment = asyncHandler(async(req,res) =>{

    try {
        const userId  = req?.user?._id;
        if(!userId){
            throw new ApiError(401, 'Unauthorized');
        }
        const {commentId} = req.params;
        if(!isValidObjectId(commentId)){
            throw new ApiError(400, 'Invalid Comment ID');
        }
        const {content} = req?.body;
        if(!content || content.trim().length === 0){
            throw new ApiError(400, 'Comment content cannot be empty');
        }
        const oldComment = await Comment.findOne({_id: commentId});
        if(!oldComment){
            throw new ApiError(404, 'Comment not found');
        }
       // console.log(oldComment.owner.toString()==userId);
        if(oldComment.owner.toString()==userId.toString()){
            oldComment.content = content;
            await oldComment.save();
            return res.status(200).json(
                new ApiResponse(200, oldComment,"Comment updated successfully")
            )
        }else{
            throw new ApiError(403, 'Unauthorized to update this comment');
        }

        
    } catch (error) {
        
        throw new ApiError(500, error.message || "Error updating comment")
    }
})

const deleteComment = asyncHandler(async(req,res) =>{
    try {
        const userId  = req?.user?._id;
        if(!userId){
            throw new ApiError(401, 'Unauthorized');
        }
        const {commentId} = req.params;
        if(!isValidObjectId(commentId)){
            throw new ApiError(400, 'Invalid Comment ID');
        }
        const comment = await Comment.findOne({_id: commentId});
        if(!comment){
            throw new ApiError(404, 'Comment not found');
        }
        if(comment.owner.toString()==userId.toString()){
         const deletedcomment =    await Comment.findByIdAndDelete({_id: commentId})
         if(!deletedcomment){
             throw new ApiError(500, 'Failed to delete comment');
         }
            
            return res.status(200).json(
                new ApiResponse(200, null,"Comment deleted successfully")
            )
        }else{
            throw new ApiError(403, 'Unauthorized to delete this comment');
        }
        
    } catch (error) {
        
        throw new ApiError(500, error.message || "Error deleting comment")
    
    }

})

const getVideoComments = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const isGuest = !req?.user?._id;
  
    if (!isValidObjectId(videoId)) throw new ApiError(401, "Invalid VideoID");
  
    const video = await Video.findById(videoId);
  
    if (!video) throw new ApiError(404, "Video not found");
  
    const commentsAggregate = Comment.aggregate([
      {
        $match: {
          video: new mongoose.Types.ObjectId(videoId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
        },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "comment",
          as: "likes",
        },
      },
      {
        $addFields: {
          likesCount: {
            $size: "$likes",
          },
          owner: {
            $first: "$owner",
          },
          isLiked: {
            $cond: {
              if: isGuest,
              then: false,
              else: {
                $cond: {
                  if: { $in: [req.user?._id, "$likes.likedBy"] },
                  then: true,
                  else: false,
                },
              },
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
          createdAt: 1,
          likesCount: 1,
          owner: {
            username: 1,
            fullName: 1,
            avatar: 1,
            _id: 1,
          },
          isLiked: 1,
        },
      },
    ]);
  
    if (!commentsAggregate) {
      throw new ApiError(500, "Error creating comments aggregate");
    }
  
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };
  
    const comments = await Comment.aggregatePaginate(commentsAggregate, options);
  
    if (!comments) throw new ApiError(501, "Comments Pagination failed");
  
    return res
      .status(200)
      .json(
        new ApiResponse(200, comments, "Video Comments fetched Successfully")
      );
  });

  const getTweetComments = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, 'Invalid Tweet ID');
    }

    const commentsAggregate = Comment.aggregate([
        {
            $match: {
                tweet: new mongoose.Types.ObjectId(tweetId),
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'owner',
                foreignField: '_id',
                as: 'owner',
            },
        },
        {
            $addFields: {
                owner: { $first: '$owner' },
            },
        },
        {
            $sort: { createdAt: -1 },
        },
        {
            $project: {
                content: 1,
                createdAt: 1,
                owner: {
                    username: 1,
                    fullName: 1,
                    avatar: 1,
                    _id: 1,
                },
            },
        },
    ]);

    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
    };

    const comments = await Comment.aggregatePaginate(commentsAggregate, options);

    if (!comments) {
        throw new ApiError(500, 'Failed to fetch comments');
    }

    return res.status(200).json(
        new ApiResponse(200, comments, 'Comments fetched successfully')
    );
});

export {
    addComment,
    updateComment,
    deleteComment,
    getVideoComments,
    getTweetComments
}