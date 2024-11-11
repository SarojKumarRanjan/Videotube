import axios from "axios";
import { BASE_URL } from "../constant";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

interface publishVideo{
    isPublished:boolean
    title:string
    description:string
    thumbnail:File
    videoFile:File

}

interface updateVideoDetails{
   
    title?:string
    description?:string
    thumbnail?:File
   
}

export const getAllVideo = async (pageParam:number) => {
  try {
    const res = await API.get("/video/get-all-videos?page="+pageParam+"&limit="+12);
    const data = res.data;
   // console.log(data);
    
    return data?.data?.docs;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      toast.error(
        error.response.data?.error ||
          "Something went wrong while getting all videos"
      );
    } else {
      toast.error("An unexpected error occurred while getting all videos");
    }
    console.log(error);
    throw error;
  }
};

export const publishVideo = async (formData:publishVideo) =>{
    try {
        const res = await API.post("/video/publish-video",formData);
       
        const data = res.data;
        return data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
        toast.error(
            error.response.data?.error ||
            "Something went wrong while publishing video"
        );
        } else {
        toast.error("An unexpected error occurred while publishing video");
        }
        console.log(error);
        throw error;
    }
}


export const getVideoById = async (videoId:string) => {
    try {
        const res = await API.get("/video/get-video/"+videoId);
        const data = res.data;
        return data?.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
        toast.error(
            error.response.data?.error ||
            "Something went wrong while getting single video"
        );
        } else {
        toast.error("An unexpected error occurred while getting single video");
        }
        console.log(error);
        throw error;
    }
    }

 export const updateVideoDetails = async (videoId:string,formData:updateVideoDetails) =>{
        try {
            const res = await API.patch("/video/update-video/"+videoId,formData);
            const data = res.data;
            return data;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
            toast.error(
                error.response.data?.error ||
                "Something went wrong while updating video"
            );
            } else {
            toast.error("An unexpected error occurred while updating video");
            }
            console.log(error);
            throw error;
        }
    }

export const deleteVideo = async (videoId:string) =>{
    try {
        const res = await API.delete("/video/delete-video/"+videoId);
        const data = res.data;
        return data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
        toast.error(
            error.response.data?.error ||
            "Something went wrong while deleting video"
        );
        } else {
        toast.error("An unexpected error occurred while deleting video");
        }
        console.log(error);
        throw error;
    }
}

export const toggleVideoPublish = async (videoId:string) =>{
    
    try {
        const res = await API.patch("/video/toggle-publish/"+videoId);
        const data = res.data;
        return data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
        toast.error(
            error.response.data?.error ||
            "Something went wrong while toggling video publish"
        );
        } else {
        toast.error("An unexpected error occurred while toggling video publish");
        }
        console.log(error);
        throw error;
    }
}

export const updateWatchHistory = async (videoId:string) =>{
    try {
        const res = await API.post("/video/update-watch-history/"+videoId);
        const data = res.data;
        return data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
        toast.error(
            error.response.data?.error ||
            "Something went wrong while updating watch history"
        );
        } else {
        toast.error("An unexpected error occurred while updating watch history");
        }
        console.log(error);
        throw error;
    }
}
export const getRecomendedVideo = async(videoId:string) =>{
    try {
        const res = await API.get("/video/get-recommended-videos/"+videoId);
        const data = res.data;
        return data?.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
        toast.error(
            error.response.data?.error ||
            "Something went wrong while getting recommended video"
        );
        } else {
        toast.error("An unexpected error occurred while getting recommended video");
        }
        console.log(error);
        throw error;
    }
}