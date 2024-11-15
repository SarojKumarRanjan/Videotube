/* eslint-disable @typescript-eslint/ban-ts-comment */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { addVideoToPlaylist,
    getPlaylistById,
    getYourPlaylist,
    getUserPlaylists,
    createPlaylist,
    updatePlaylistDetails,
    deletePlaylist,
    removeVideoFromPlaylist
 } from "../api/playlist.api";


export const useGetUserPlaylist = (id:string) =>{
    return useQuery({
        queryKey:["UserPlaylist"],
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

export const useAddVideoToPlaylist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ playlistId, videoId }: { playlistId: string, videoId: string }) => {
            return addVideoToPlaylist(playlistId, videoId);
        },
        onSuccess:(data) => {
            
            //@ts-ignore
            queryClient.invalidateQueries(["Playlist",data?.playlistId]);
        },
        retry: 0
    });
};

interface createPlaylisttype{
    name?:string
    description?:string
    playlistId?:string
}
export const useCreatePlaylist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(playlistData:createPlaylisttype) => createPlaylist(playlistData),
        onSuccess:() => {
            //@ts-ignore
            queryClient.invalidateQueries(["yourPlaylists"])
        },
        retry:0
    })
}


export const useUpdatePlaylistDetails = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:({ playlistId,playlistData }: { playlistId: string, playlistData: createPlaylisttype }) => updatePlaylistDetails(playlistId,playlistData),
        onSuccess:() => {
            //@ts-ignore
            queryClient.invalidateQueries(["yourPlaylists"])
        },
        retry:0
    })
}

export const useDeletePlaylist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(playlistId:string) => deletePlaylist(playlistId),
        onSuccess:() => {
            //@ts-ignore
            queryClient.invalidateQueries(["yourPlaylists"])
        },
        retry:0
    })
}

export const useRemoveVideoFromPlaylist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:({ playlistId,videoId }: { playlistId: string, videoId: string }) => removeVideoFromPlaylist(playlistId,videoId),
        onSuccess:({ playlistId }: { playlistId: string }) => {
           
            //@ts-ignore
            queryClient.invalidateQueries(["Playlist", playlistId]);
        },
        retry:0
    })
}

