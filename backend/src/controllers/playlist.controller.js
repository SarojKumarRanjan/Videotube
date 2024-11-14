import { Playlist } from "./../models/playlist.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/errorHandler.js";
import { ApiResponse } from "../utils/responseHandler.js";

const createPlaylist = asyncHandler(async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || name.trim().length === 0) {
      throw new ApiError(400, "Name is required");
    }

    const playlist = await Playlist.create({
      name,
      description,
      owner: req.user._id,
    });

    if (!playlist) {
      throw new ApiError(500, "Failed to create playlist");
    }

    return res
      .status(201)
      .json(new ApiResponse(201, playlist, "Playlist created successfully"));
  } catch (error) {
    throw new ApiError(400, error.message || "Error creating playlist");
  }
});

const getPlaylistById = asyncHandler(async (req, res) => {
  try {
    const { playlistId } = req.params;

    if (!isValidObjectId(playlistId)) {
      throw new ApiError(400, "Invalid playlist id");
    }

    const playlist = await Playlist.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(playlistId) },
      },
      {
        $lookup: {
          from: "videos",
          localField: "videos",
          foreignField: "_id",
          as: "videos",
        },
      },
      {
        $match: {
          "videos.isPublished": true,
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
      // Lookup for each video's owner
      {
        $lookup: {
          from: "users",
          localField: "videos.owner",
          foreignField: "_id",
          as: "videoOwners",
        },
      },
      {
        $addFields: {
          totalVideos: { $size: "$videos" },
          totalDuration: { $sum: "$videos.duration" },
          totalViews: { $sum: "$videos.views" },
          owner: {
            $mergeObjects: [
              { $arrayElemAt: ["$owner", 0] },
              {
                subscribers: {
                  $ifNull: [
                    { $arrayElemAt: ["$subscriberInfo.subscriberCount", 0] },
                    0,
                  ],
                },
              },
            ],
          },
          coverImage: {
            $ifNull: [
              {
                $let: {
                  vars: {
                    latestVideo: {
                      $arrayElemAt: [
                        {
                          $sortArray: {
                            input: "$videos",
                            sortBy: { createdAt: -1 },
                          },
                        },
                        0,
                      ],
                    },
                  },
                  in: "$$latestVideo.thumbnail",
                },
              },
              null,
            ],
          },
        },
      },
      // Map video owners into each video object
      {
        $addFields: {
          videos: {
            $map: {
              input: "$videos",
              as: "video",
              in: {
                $mergeObjects: [
                  "$$video",
                  {
                    ownerName: {
                      $let: {
                        vars: {
                          ownerObj: {
                            $arrayElemAt: [
                              {
                                $filter: {
                                  input: "$videoOwners",
                                  cond: { $eq: ["$$this._id", "$$video.owner"] },
                                },
                              },
                              0,
                            ],
                          },
                        },
                        in: "$$ownerObj.userName",
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          createdAt: 1,
          updatedAt: 1,
          totalVideos: 1,
          totalViews: 1,
          totalDuration: 1,
          coverImage: 1,
          videos: {
            _id: 1,
            videoFile: 1,
            thumbnail: 1,
            title: 1,
            description: 1,
            duration: 1,
            createdAt: 1,
            views: 1,
            ownerName: 1, // Include owner's username in each video
          },
          owner: {
            userName: 1,
            fullName: 1,
            avatar: 1,
            _id: 1,
            subscribers: 1,
          },
        },
      },
    ]);

    if (!playlist || playlist.length === 0) {
      throw new ApiError(404, "Playlist not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, playlist[0], "Playlist retrieved successfully")
      );
  } catch (error) {
    throw new ApiError(500, error.message || "Error retrieving playlist");
  }
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid userId");
  }

  const playlists = await Playlist.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "videos",
        foreignField: "_id",
        as: "videos",
      },
    },
    {
      $addFields: {
        totalVideos: {
          $size: "$videos",
        },
        totalDuration: {
          $sum: "$videos.duration",
        },
        totalViews: {
          $sum: "$videos.views",
        },
        coverImage: {
          $ifNull: [
            {
              $let: {
                vars: {
                  latestVideo: {
                    $arrayElemAt: [
                      {
                        $sortArray: { input: "$videos", sortBy: { createdAt: -1 } },
                      },
                      0,
                    ],
                  },
                },
                in: "$$latestVideo.thumbnail",
              },
            },
            null
          ],
        },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        totalVideos: 1,
        totalDuration: 1,
        totalViews: 1,
        updatedAt: 1,
        coverImage: 1,
      },
    },
  ]);

  if (!playlists || playlists.length === 0) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, [], "No playlists found for the user")
      );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, playlists, "User playlists fetched successfully")
    );
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  try {
    const { playlistId, videoId } = req.params;
    //console.log(playlistId, videoId);

    if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
      throw new ApiError(400, "Invalid playlist or video id");
    }

    const existingPlaylist = await Playlist.findById(playlistId);

    console.log("existingPlaylist", existingPlaylist);

    if (!existingPlaylist) {
      throw new ApiError(404, "Playlist not found");
    }

   

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      playlistId,
      {
        $addToSet: {
          videos: videoId,
        },
      },
      { new: true }
    );

    if (!updatedPlaylist) {
      throw new ApiError(404, "Error while adding video to playlist");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedPlaylist, "Video added to playlist successfully")
      );
  } catch (error) {
    throw new ApiError(400, error.message || "Error adding video to playlist");
  }
});

const deleteVideoFromPlaylist = asyncHandler(async (req, res) => {
  try {
    const { playlistId, videoId } = req.params;

    if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
      throw new ApiError(400, "Invalid playlist or video id");
    }

    const playlist = await Playlist.findByIdAndUpdate(
      playlistId,
      {
        $pull: {
          videos: videoId,
        },
      },
      { new: true }
    );

    if (!playlist) {
      throw new ApiError(404, "Error while deleting video from playlist");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          playlist,
          "Video deleted from playlist successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      400,
      error.message || "Error deleting video from playlist"
    );
  }
});

const deletePlaylist = asyncHandler(async (req, res) => {
  try {
    const { playlistId } = req.params;

    if (!isValidObjectId(playlistId)) {
      throw new ApiError(400, "Invalid playlist id");
    }

    const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    throw new ApiError(404, "Playlist not found");
  }

  if (playlist.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(401, "Only owner can delete playlist");
  }

  const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId);

  if (!deletedPlaylist) {
    throw new ApiError(500, "Failed to delete playlist");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, deletedPlaylist, "Playlist deleted successfully")
    );
  } catch (error) {
    throw new ApiError(400, error.message || "Error deleting playlist");
  }
});

const updatePlaylist = asyncHandler(async (req, res) => {
    try {
        const { playlistId } = req.params;
        const { name, description } = req.body;
      
        if (
          [name, description].some(
            (field) => field === undefined || field?.trim() === ""
          )
        ) {
          throw new ApiError(400, "All fields are required");
        }
      
        if (!isValidObjectId(playlistId)) {
          throw new ApiError(400, "Invalid playlistId");
        }
      
        const playlist = await Playlist.findById(playlistId);
      
        if (!playlist) {
          throw new ApiError(404, "Playlist not found");
        }
      
        if (playlist.owner.toString() !== req.user._id.toString()) {
          throw new ApiError(401, "Only owner can update playlist");
        }
      
        const updatedPlaylist = await Playlist.findByIdAndUpdate(
          playlistId,
          {
            $set: {
              name,
              description,
            },
          },
          { new: true }
        );
      
        if (!updatedPlaylist) {
          throw new ApiError(500, "Failed to update playlist");
        }
      
        return res
          .status(200)
          .json(
            new ApiResponse(200, updatedPlaylist, "Playlist updated successfully")
          );
    } catch (error) {
        throw new ApiError(400, error.message || "Error updating playlist");
        
    }
  });

  const getYourPlaylists = asyncHandler(async (req, res) => {
    const  userId  = req.user._id;
    if (!isValidObjectId(userId)) {
      throw new ApiError(400, "Invalid userId");
    }
  
    const playlists = await Playlist.aggregate([
      {
        $match: {
          owner: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "videos",
          localField: "videos",
          foreignField: "_id",
          as: "videos",
        },
      },
      {
        $addFields: {
          totalVideos: {
            $size: "$videos",
          },
          totalDuration: {
            $sum: "$videos.duration",
          },
          totalViews: {
            $sum: "$videos.views",
          },
          coverImage: {
            $ifNull: [
              {
                $let: {
                  vars: {
                    latestVideo: {
                      $arrayElemAt: [
                        {
                          $sortArray: { input: "$videos", sortBy: { createdAt: -1 } },
                        },
                        0,
                      ],
                    },
                  },
                  in: "$$latestVideo.thumbnail",
                },
              },
              null
            ],
          },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          totalVideos: 1,
          totalDuration: 1,
          totalViews: 1,
          updatedAt: 1,
          coverImage: 1,
        },
      },
    ]);
  
    if (!playlists || playlists.length === 0) {
      return res
        .status(200)
        .json(
          new ApiResponse(200, [], "No playlists found for the user")
        );
    }
  
    return res
      .status(200)
      .json(
        new ApiResponse(200, playlists, "User playlists fetched successfully")
      );
  });

  export {
    createPlaylist,
    getPlaylistById,
    getUserPlaylists,
    addVideoToPlaylist,
    deleteVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist,
    getYourPlaylists
  }
