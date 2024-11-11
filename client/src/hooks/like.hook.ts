import { getLikedVideo } from "../api/like.api";
import { useQuery,useMutation } from "@tanstack/react-query";
import { videoLike,commentLike } from "../api/like.api";
import { useQueryClient } from "@tanstack/react-query";

export const useGetLikedVideo = () => {
    return useQuery({
        queryKey:["LikedVideo"],
        queryFn:() => getLikedVideo(),
        staleTime:5000,
        retry:1
    })
}

export const useVideoLike = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(videoId:string) => videoLike(videoId),
        onSuccess:(data) => {
            //console.log(data);
            
            queryClient.invalidateQueries({
                queryKey:["video",data]
            })
        },

        
        retry:0
    })
}

export const useCommentLike = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(commentId:string) => commentLike(commentId),
        onSuccess:() => {
            //console.log(data);
            queryClient.invalidateQueries({
                queryKey:["tweets"]
            })
        },
        retry:0
    })
}
