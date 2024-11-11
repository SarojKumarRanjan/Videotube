import axios from "axios";
import { BASE_URL } from "../constant";
import { toast } from "react-hot-toast";
import { AxiosError } from "axios";



const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

interface createPlaylisttype{
    name?:string
    description?:string
}

export const createPlaylist = async (playlistData:createPlaylisttype) => {
    try {
        const res = await API.post("/playlist/add",playlistData);
        const data = res.data;
        return data?.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
        toast.error(
            error.response.data?.error ||
            "Something went wrong while creating playlist"
        );
        } else {
        toast.error("An unexpected error occurred while creating playlist");
        }
        console.log(error);
        throw error;
    }
    }

export const updatePlaylistDetails = async (playlistId:string,playlistData:createPlaylisttype) => {   
    try {
        const res = await API.put("/playlist/update/"+playlistId,playlistData);
        const data = res.data;
        return data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
        toast.error(
            error.response.data?.error ||
            "Something went wrong while updating playlist details"
        );
        } else {
        toast.error("An unexpected error occurred while updating playlist details");
        }
        console.log(error);
        throw error;
    }
    }

export const deletePlaylist = async (playlistId:string) => {
    try {
        const res = await API.delete("/playlist/delete/"+playlistId);
        const data = res.data;
        return data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
        toast.error(
            error.response.data?.error ||
            "Something went wrong while deleting playlist"
        );
        } else {
        toast.error("An unexpected error occurred while deleting playlist");
        }
        console.log(error);
        throw error;
    }
    }

export const getPlaylistById = async (playlistId:string) => {
    try {
        const res = await API.get("/playlist/"+playlistId);
        const data = res.data;
        return data?.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
        toast.error(
            error.response.data?.error ||
            "Something went wrong while getting playlist"
        );
        } else {
        toast.error("An unexpected error occurred while getting playlist");
        }
        console.log(error);
        throw error;
    }
    }

export const getUserPlaylists = async (userId:string) => {
    try {
        const res = await API.get("/playlist/user/"+userId);
        const data = res.data;
        return data?.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
        toast.error(
            error.response.data?.error ||
            "Something went wrong while getting user playlists"
        );
        } else {
        toast.error("An unexpected error occurred while getting user playlists");
        }
        console.log(error);
        throw error;
    }
    }

export const addVideoToPlaylist = async (playlistId:string,videoId:string) => {
    try {
        const res = await API.post("/playlist/"+playlistId+"/video/"+videoId);
        const data = res.data;
        return data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
        toast.error(
            error.response.data?.error ||
            "Something went wrong while adding video to playlist"
        );
        } else {
        toast.error("An unexpected error occurred while adding video to playlist");
        }
        console.log(error);
        throw error;
    }
    }

export const removeVideoFromPlaylist = async (playlistId:string,videoId:string) => {
    try {
        const res = await API.delete("/playlist/"+playlistId+"/video/"+videoId);
        const data = res.data;
        return data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
        toast.error(
            error.response.data?.error ||
            "Something went wrong while removing video from playlist"
        );
        } else {
        toast.error("An unexpected error occurred while removing video from playlist");
        }
        console.log(error);
        throw error;
    }
    }

export const getYourPlaylist = async() => {
    try {
        const res = await API.get("/playlist/playlists");
        const data = res.data;
        return data?.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
        toast.error(
            error.response.data?.error ||
            "Something went wrong while getting your playlists"
        );
        } else {
        toast.error("An unexpected error occurred while getting your playlists");
        }
        console.log(error);
        throw error;
    }
}