import axios from "axios";
import { BASE_URL } from "../constant";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});


export const toggleSubscribe = async (channelId:string) => {
    try {
        const res = await API.post("/subscription/subscribe/"+channelId);
        const data = res.data;
        return data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
        toast.error(
            error.response.data?.error ||
            "Something went wrong while subscribing"
        );
        } else {
        toast.error("An unexpected error occurred while subscribing");
        }
        console.log(error);
        throw error;
    }
    }

export const getSubscribedChannels = async () => {
    try {
        const res = await API.get("/subscription/subscribed");
        const data = res.data;
        return data?.data;
        //console.log(data);
        
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
        toast.error(
            error.response.data?.error ||
            "Something went wrong while getting subscribed channels"
        );
        } else {
        toast.error("An unexpected error occurred while getting subscribed channels");
        }
        console.log(error);
        throw error;
    }
    }

export const getSubscribers = async (channelId:string) => {
    try {
        const res = await API.get("/subscription/subscribers"+channelId);
        const data = res.data;
        return data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
        toast.error(
            error.response.data?.error ||
            "Something went wrong while getting subscribers"
        );
        } else {
        toast.error("An unexpected error occurred while getting subscribers");
        }
        console.log(error);
        throw error;
    }
    }


export const getYourSubscribedVideos = async() => {
    try {
        const res = await API.get("/video/get-subscribed-channel-videos");
        const data = res.data;
        return data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
        toast.error(
            error.response.data?.error ||
            "Something went wrong while getting subscribed videos"
        );
        } else {
        toast.error("An unexpected error occurred while getting subscribed videos");
        }
        console.log(error);
        throw error;
    }
}