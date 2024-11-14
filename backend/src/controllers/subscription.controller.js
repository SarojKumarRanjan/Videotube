import { Subscription } from "./../models/subscription.model.js";
import { User } from "./../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/errorHandler.js";
import { ApiResponse } from "../utils/responseHandler.js";

//list of steps to follow to toggle subscription
//1.check if the userid is same as channel id return error message
//2.check if the user is already subscribed
//3.if not subscribed then subscribe the channel

const toggleSubscription = asyncHandler(async (req, res) => {
    const  userId  = req?.user?._id;
    const { channelId } = req?.params;

    //console.log(req?.user._id);

    if (!isValidObjectId(userId)) {
      throw new ApiError(400, "Invalid User ID");
    }
    if (!isValidObjectId(channelId)) {
      throw new ApiError(400, "Invalid Channel ID");
    }
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const channel = await User.findById(channelId);
    if (!channel) {
      throw new ApiError(404, "Channel not found");
    }
    if (userId.toString() === channelId.toString()) {
      throw new ApiError(400, "User cannot subscribe to themselves");
    }
    const existingSubscription = await Subscription.findOne({
      subscriber: userId,
      channel: channelId,
    });
    if (existingSubscription) {
        await Subscription.findByIdAndDelete(existingSubscription?._id);
        return res
          .status(200)
          .json(new ApiResponse(200, null, "Channel Unsubscribed"));
      } else {
        await Subscription.create({
          channel: channelId,
          subscriber: userId,
        });
        return res
          .status(200)
          .json(new ApiResponse(200, null, "Channel Subscribed"));
    }
    
});

//controller to get the list of subscribers of a channel
//1.Validate the channel ID
//2.Check if the channel (user) exists
//3.Set up pagination parameters
//4.Use aggregation to get the list of subscribers
//5.Get the total count of subscribers

const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  

  if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid Channel ID");
  }

  const channel = await User.findById(channelId);
  if (!channel) {
    throw new ApiError(404, "Channel not found");
  }

  const channelSubscribers = await Subscription.aggregate([
    {
      $match: {
        channel: channelId,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "subscriber",
        foreignField: "_id",
        as: "subscriber",
        pipeline: [
          {
            $lookup: {
              from: "subscriptions",
              localField: "_id", //subscriber's id
              foreignField: "channel",
              as: "subscribedToSubscriber",
            },
          },
          {
            $addFields: {
              subscribedToSubscriber: {
                $cond: {
                  if: {
                    $in: [channelId, "$subscribedToSubscriber.subscriber"],
                  },
                  then: true,
                  else: false,
                },
              },
              subscribersCount: {
                $size: "$subscribedToSubscriber",
              },
            },
          },
        ],
      },
    },
    {
      $unwind: "$subscriber",
    },
    {
      $project: {
        _id: 0,
        subscriber: {
          _id: 1,
          username: 1,
          fullName: 1,
          avatar: 1,
          subscribedToSubscriber: 1,
          subscribersCount: 1,
        },
      },
    },
  ]);

  if (!channelSubscribers)
    throw new ApiError(500, "Fetching User Channel Subscribers failed");
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        channelSubscribers,
        "User Channel Subscribers fetched Successfully"
      )
    );
});

// controller to return channel list to which user has subscribed
//1.Extract the user ID from the request. This could be from the authenticated user or from a route parameter
//2.Validate the user ID
//3.Check if the user exists
//4.Set up pagination parameters
//5.Use aggregation to get the list of subscribed channels
//6.Get the total count of subscribed channels

const getSubscribedChannels = asyncHandler(async (req, res) => {
    const subscriberId =  req?.user?._id;
  
    const subscribedChannels = await Subscription.aggregate([
      {
        $match: {
          subscriber: new mongoose.Types.ObjectId(subscriberId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "channel",
          foreignField: "_id",
          as: "subscribedChannel",
          pipeline: [
            {
              $lookup: {
                from: "videos",
                localField: "_id",
                foreignField: "owner",
                as: "videos",
                pipeline: [
                  {
                    $match: {
                      isPublished: true
                    }
                  },
                  {
                    $sort: { createdAt: -1 }
                  },
                  {
                    $limit: 1
                  }
                ]
              },
            },
            {
              $addFields: {
                latestVideo: {
                  $arrayElemAt: ["$videos", 0]
                },
              },
            },
          ],
        },
      },
      {
        $unwind: "$subscribedChannel",
      },
      {
        $project: {
          _id: 0,
          subscribedChannel: {
            _id: 1,
            username: 1,
            fullName: 1,
            avatar: 1,
            latestVideo: {
              _id: 1,
              videoFile: 1,
              thumbnail: 1,
              owner: 1,
              title: 1,
              description: 1,
              duration: 1,
              createdAt: 1,
              views: 1,
              ownerDetails: 1,
            },
          },
        },
      },
    ]);
  
    if (!subscribedChannels)
      throw new ApiError(501, "Failed to fetch Subscribed Channels");
  
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          subscribedChannels,
          "subscribed channels fetched successfully"
        )
      );
  });

  export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels,
  }