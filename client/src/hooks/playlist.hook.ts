import { getUserPlaylists } from "../api/playlist.api";
import { useQuery } from "@tanstack/react-query";
import { getYourPlaylist } from "../api/playlist.api";
import { getPlaylistById } from "../api/playlist.api";


export const useGetUserPlaylist = (id:string) =>{
    return useQuery({
        queryKey:["UserPlaylist",id],
        queryFn:() => getUserPlaylists(id),
        retry:0
    })
}

export const useGetYourPlaylist = () =>{
    return useQuery({
        queryKey:["yourPlaylists"],
        queryFn:() => getYourPlaylist(),
        retry:0
    })
}

export const useGetPlaylist = (id:string) =>{
    return useQuery({
        queryKey:["Playlist",id],
        queryFn:() => getPlaylistById(id),
        retry:0
    })
}