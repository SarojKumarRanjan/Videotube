/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useInfiniteQuery,useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import { getAllVideo } from "../api/video.api";
import { getUserHistory } from "../api/auth.api";
import { publishVideo } from "../api/video.api";
import { getVideoById,
    getRecomendedVideo,
    updateWatchHistory,
    updateVideoDetails,
    deleteVideo,
    toggleVideoPublish
 } from "../api/video.api";
import { getYourSubscribedVideos } from "../api/subscription.api";
import { useSelector } from "react-redux";

 



export const useVideos = (userId?:string,query?:string) => {  
   

  return useInfiniteQuery({
    
    queryKey: ["videos",userId,query],
    queryFn: ({ pageParam = 1}) => getAllVideo(pageParam,userId,query as string),
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNextPage) return undefined;
      return lastPage.nextPage;
    },
    staleTime: 1000*60,//1min 
    initialPageParam: 1,
    retry:0,
    refetchOnWindowFocus: false,
    
  });
};

export const useWatchHistory = () => {
    return useQuery({
        queryKey:["watchHistory"],
        queryFn:() => getUserHistory(),
        staleTime:5000,
        retry:0
    })
}

interface publishVideo{
    isPublished:boolean
    title:string
    description:string
    thumbnail:File
    videoFile:File

}
export const useUploadVideo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(formData:publishVideo) => publishVideo(formData),
        onSuccess:() => {
            queryClient.invalidateQueries({
                queryKey:[""]
            })
        },
        retry:0
    })
}

export const useGetVideoById = (videoId:string) => {
    //@ts-ignore
    const guest = useSelector((state) => !state.auth.authStatus)
    return useQuery({
        queryKey:["video",videoId],
        queryFn:() => getVideoById(videoId,guest),
        staleTime:5000,
        retry:0
    })
}

export const useSubscribedVideos = () => {
    return useQuery({
        queryKey:["subscribedVideos"],
        queryFn:() => getYourSubscribedVideos(),
        staleTime:1000*60*5,//5min
        retry:0
    })
}
export const useGetRecomendedVideos = (videoId: string) => {
    return useQuery({
        
        queryKey: ["recomendedVideos", videoId],
        
        queryFn: ({ queryKey }) => {
            const [, videoId] = queryKey;
            return getRecomendedVideo(videoId);
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 0,
    });
};

export const useUpdateWatchHistory = () => {
    return useMutation({
        mutationFn:(videoId:string) => updateWatchHistory(videoId),
        retry:0
    })
}

interface updateVideoDetails{
   
    title?:string
    description?:string
    thumbnail?:string
    _id:string
   
}

export const useUpdateVideoDetails = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:({formData}:{formData:updateVideoDetails}) => updateVideoDetails(formData._id,formData),
        onSuccess:(data) => {
            const videoId = data?.data?._id;
            queryClient.invalidateQueries({

                queryKey:["video",videoId]
            })
            queryClient.invalidateQueries({
                queryKey:["channelVideos"]
            })
        },
        retry:0
    })
}

export const useDeleteVideo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(videoId:string) => deleteVideo(videoId),
        onSuccess:() => {
            queryClient.invalidateQueries({
                queryKey:["channelVideos"]
            })
        },
        retry:0
    })
}

export const useToggleVideoPublish = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(videoId:string) => toggleVideoPublish(videoId),
        onSuccess:() => {
            queryClient.invalidateQueries({
                queryKey:["channelVideos"]
            })
        },
        retry:0
    })
}