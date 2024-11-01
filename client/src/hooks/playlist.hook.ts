import { getUserPlaylists } from "../api/playlist.api";
import { useQuery } from "@tanstack/react-query";
import { getYourPlaylist } from "../api/playlist.api";


export const useGetUserPlaylist = (id:string) =>{
    return useQuery({
        queryKey:["UserPlaylist",id],
        queryFn:() => getUserPlaylists(id)
    })
}

export const useGetYourPlaylist = () =>{
    return useQuery({
        queryKey:["yourPlaylists"],
        queryFn:() => getYourPlaylist()
    })
}