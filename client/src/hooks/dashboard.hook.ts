
import { useQuery } from "@tanstack/react-query"
import { getChannelAbout,getChannelStats,getChannelVideo } from "../api/dashboard.api"

export const useGetChannelAbout = () => {
    return useQuery({
        queryKey:["channelAbout"],
        queryFn:() => getChannelAbout(),
        retry:0,
        staleTime:60*1000*5
    })
}

export const useGetChannelStats = () => {

    return useQuery({
        queryKey:["channelStats"],
        queryFn:() => getChannelStats(),
        retry:0,
        staleTime:60*1000*5
    })
}

export const useGetChannelVideos = () => {
    return useQuery({
        queryKey:["channelVideos"],
        queryFn:() => getChannelVideo(),
        retry:0,
        staleTime:60*1000*5
    })
}