import axios from "axios";
import { BASE_URL } from "../constant";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
interface commentArgumentInterface {
  content?: string;
  commentParent: string;
}

export const getVideoComments = async (
  videoId: string,
  page: number,
  limit: number
) => {
  try {
    const res = await API.get(
      "/comment/get-video-comments/" +
        videoId +
        "?page=" +
        page +
        "&limit=" +
        limit
    );
    const data = res?.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      toast.error(
        error.response.data?.error ||
          "Something went wrong while getting video commnets"
      );
    } else {
      toast.error("something went wrong while getting video comments");
    }
    console.log(error);
    throw error;
  }
};

export const addComment = async (commentArgument: commentArgumentInterface) => {
  try {
    const res = await API.post("/comment/", commentArgument);
    const data = res?.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      toast.error(
        error.response.data?.error ||
          "Something went wrong while adding comment to video or tweet"
      );
    } else {
      toast.error("error while adding like");
    }
    console.log(error);
    throw error;
  }
};

export const updateComment = async (
  commentArgument: commentArgumentInterface,
  commentId: string
) => {
  try {
    const res = await API.patch(
      "/comment/update-comment" + commentId,
      commentArgument
    );
    const data = res?.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      toast.error(
        error.response.data?.error ||
          "error while updating comment of video or tweet"
      );
    } else {
      toast.error("error while updating comment");
    }
    console.log(error);
    throw error;
  }
};

export const deleteCommentVideo = async (commentId: string) => {
  try {
    const res = await API.delete("/comment/delete-comment/" + commentId);
    const data = res?.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      toast.error(
        error.response.data?.error || "error while deleting comment of video"
      );
    } else {
      toast.error("something went wrong while deleting comment");
    }
    console.log(error);
    throw error;
  }
};

export const deleteCommentTweet = async (commentId: string) => {
  try {
    const res = await API.delete("/comment/delete-comment/" + commentId);
    const data = res?.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      toast.error(
        error.response.data?.error || "error while deleting comment of tweet"
      );
    } else {
      toast.error("something went wrong while deleting comment");
    }
    console.log(error);
    throw error;
  }
};



//have make a seperate route in backend for the delete comment for the tweet and video 
//have to update add comment and update comment route for the video and tweet 