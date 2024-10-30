import { getLikedVideo } from "../api/like.api";
import { useQuery } from "@tanstack/react-query";

export const useGetLikedVideo = () => {
    return useQuery({
        queryKey:["LikedVideo"],
        queryFn:() => getLikedVideo(),
        staleTime:5000,
        retry:1
    })
}