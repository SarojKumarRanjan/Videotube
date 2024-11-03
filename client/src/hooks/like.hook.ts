import { getLikedVideo } from "../api/like.api";
import { useQuery,useMutation } from "@tanstack/react-query";
import { videoLike } from "../api/like.api";

export const useGetLikedVideo = () => {
    return useQuery({
        queryKey:["LikedVideo"],
        queryFn:() => getLikedVideo(),
        staleTime:5000,
        retry:1
    })
}

export const useVideoLike = () =>{
    return useMutation({
        mutationFn:(videoId:string) => videoLike(videoId),
        
        retry:0
    })
}
