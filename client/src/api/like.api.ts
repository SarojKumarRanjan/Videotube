import axios from "axios";
import { BASE_URL } from "../constant";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";




const API = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });


export const getLikedVideo = async() =>{
    try {
        const res = await API.get("/like/liked/video");
        const data = res.data;
        //console.log(data);
        return data?.data;
        
        
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            toast.error(
                error.response.data?.error ||
                "Something went wrong while getting liked video"
            );
            } else {
            toast.error("An unexpected error occurred getting liked video");
            }
            console.log(error);
            throw error;
    }
}


export const commentLike = async(commentId:string) =>{
    //console.log(commentId);
    
    try {
        const res = await API.post("/like/comment/"+commentId);
        const data = res.data;
        return data;
    } catch (error) {
        if(error instanceof AxiosError && error.response){
            toast.error(
                error.response.data?.error ||
                "Something went wrong while liking comment"
            );
            } else {
            toast.error("An unexpected error occurred while liking comment");
            }
            console.log(error);
            throw error;
        
    }
}



export const videoLike = async(videoId:string) =>{


    try {
        const res = await API.post("/like/video/"+videoId);
        const data = res.data;
        toast.success(data?.message);
        return data?.data;
    } catch (error) {
        if(error instanceof AxiosError && error.response){
            toast.error(
                error.response.data?.error ||
                "Something went wrong while liking video"
            );
            } else {
            toast.error("An unexpected error occurred while liking video");
            }
            console.log(error);
            throw error;
        
    }
}


export const tweetLike = async(tweetId:string) =>{
    try {
        const res = await API.post("/like/tweet/"+tweetId);
        const data = res.data;
        return data;
    } catch (error) {
        if(error instanceof AxiosError && error.response){
            toast.error(
                error.response.data?.error ||
                "Something went wrong while liking tweet"
            );
            } else {
            toast.error("An unexpected error occurred while liking tweet");
            }
            console.log(error);
            throw error;
        
    }
}