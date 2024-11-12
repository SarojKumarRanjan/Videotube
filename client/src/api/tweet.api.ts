import axios, { AxiosError } from "axios";
import { BASE_URL } from "../constant";
import toast from "react-hot-toast";


const API =  axios.create({
    baseURL: BASE_URL,
    withCredentials: true
    });

export const getAllTweets = async () => {
    try {
        const response = await API.get("/tweet/all-tweets");
        return response?.data?.data;
    } catch (error) {
        if(error instanceof AxiosError){
            toast.error(error.response?.data?.message|| " error while fetching tweets");
        }else{
            toast.error("Something went wrong while gettig all tweets");
        }
        console.log(error);
        throw error;
    }
}


export const updateTweet = async (tweetId:string, content:string) => {
    try {
        const response = await API.patch(`/tweet/update-tweet/${tweetId}`, {content});
        return response?.data?.data;
    } catch (error) {
        if(error instanceof AxiosError){
            toast.error(error.response?.data?.message|| " error while updating tweet");
        }else{
            toast.error("Something went wrong while updating tweet");
        }
        console.log(error);
        throw error;
    }
}

export const deleteTweet = async (tweetId:string) => {
    try {
        const response = await API.delete(`/tweet/delete-tweet/${tweetId}`);
        return response?.data?.data;
    } catch (error) {
        if(error instanceof AxiosError){
            toast.error(error.response?.data?.message|| " error while deleting tweet");
        }else{
            toast.error("Something went wrong while deleting tweet");
        }
        console.log(error);
        throw error;
    }
}
