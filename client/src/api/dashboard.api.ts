import axios from "axios";
import { BASE_URL } from "../constant";
import { AxiosError } from "axios";
import toast from "react-hot-toast";


const API = axios.create({
    baseURL:BASE_URL,
    withCredentials:true
})


export const getChannelStats = async() => {
    try {
        const res = await API.get("/dashboard/getchannelStat");
        const data = res?.data;
        return data;
    } catch (error) {
        if(error instanceof AxiosError && error.response){
            toast.error(error.response.data?.error ||"error while getting channel stats")

        }else{
             toast.error("something went wrong while getting channel stats")
        }
        console.log(error);
        throw error;
        
    }
}

export const getChannelAbout = async() => {
    try {
        const res = await API.get("/dashboard/getchannelabouts")
        const data = res?.data;
        return data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            toast.error(error.response.data?.error||"error while getting channel about")
        } else {
            toast.error("something went wrong while getting channel about")
        }
        console.log(error);
        throw error;
        
    }
}


export const getChannelVideo = async() =>{
    try {
        const res = await API.get("/dashboard/getchannelvideos")
        const data = res?.data;
        return data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            toast.error(error.response.data?.error||"error while getting channel video on dashboard")
        } else {
            toast.error("something went wrong while getting channel video  on the dashboard")
        }
        console.log(error);
        throw error;
        
    }
}