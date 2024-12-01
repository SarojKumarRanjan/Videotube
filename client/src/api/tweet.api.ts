import axios, { AxiosError } from "axios";
import { BASE_URL } from "../constant";
import toast from "react-hot-toast";


const API =  axios.create({
    baseURL: BASE_URL,
    withCredentials: true
    });

export const getAllTweets = async (guest:boolean) => {
    
    try {
        const response = await API.get("/tweet/all-tweets?guest="+guest);
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


export const updateTweet = async (tweetId:string, content:string,tweetImage:File) => {
    const formData = new FormData();
    formData.append("content",content);
    formData.append("tweetImage",tweetImage);
    try {
        const response = await API.patch(`/tweet/update-tweet/${tweetId}`, formData);
        return response?.data;
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
        return response?.data;
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

export const createTweet = async (content:string,tweetImage:File) => {
    const formData = new FormData();
    formData.append("content",content);
    formData.append("tweetImage",tweetImage);
    try {
        const response = await API.post(`/tweet/add-tweet`, formData);
        return response?.data
    } catch (error) {
        if(error instanceof AxiosError){
            toast.error(error.response?.data?.message|| " error while creating tweet");
        }else{
            toast.error("Something went wrong while creating tweet");
        }
        console.log(error);
        throw error;
    }
}

export const getUserTweets = async (userId:string) => {
    try {
        const response = await API.get(`/tweet/user-tweets/${userId}`);
        return response?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}