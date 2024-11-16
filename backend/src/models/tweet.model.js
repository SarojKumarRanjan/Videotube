import mongoose, { Schema, model } from "mongoose";

const tweetSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tweetImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Tweet = model("Tweet", tweetSchema);
