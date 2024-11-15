import axios from "axios";
import { BASE_URL } from "../constant";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});


export const getVideoComments = async (
  videoId: string,
  page: number,
  limit: number,
  guest:boolean
) => {
  try {
    
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      guest:guest.toString()
    });

    const res = await API.get(
      `/comment/get-video-comments/${videoId}?${params.toString()}`
    );

    
    if (!res.data?.success) {
      throw new Error(res.data?.message || "Failed to fetch comments");
    }

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const errorMessage = error.response.data?.error || "Failed to load comments";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } else {
      const errorMessage = "Something went wrong while getting video comments";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
};



export const addVideoComment = async (videoId:string,content:string) => {
  //console.log(videoId,content);
  
  try {
    const res = await API.post("/comment/add-comment/"+videoId, { content });
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
  content:string,
  commentId: string
) => {
  try {
    const res = await API.patch(
      "/comment/update-comment/" + commentId,
      { content }
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





