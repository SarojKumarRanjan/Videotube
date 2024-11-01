import { useInfiniteQuery,useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import { getAllVideo } from "../api/video.api";
import { getUserHistory } from "../api/auth.api";
import { publishVideo } from "../api/video.api";
import { getVideoById } from "../api/video.api";

 



export const useVideos = () => {  // Added default limit
  

  return useInfiniteQuery({
    queryKey: ["videos"],
    queryFn: ({ pageParam = 1 }) => getAllVideo(pageParam),
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNextPage) return undefined;
      return lastPage.nextPage;
    },
    staleTime: 1000, 
    initialPageParam: 1,
    retry:1
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
    return useQuery({
        queryKey:["video",videoId],
        queryFn:() => getVideoById(videoId),
        staleTime:5000,
        retry:0
    })
}