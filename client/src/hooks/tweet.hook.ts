import { getAllTweets } from "../api/tweet.api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllTweets = () => {
    return useQuery({
        queryKey: ["tweets"],
        queryFn: getAllTweets,
        staleTime: 1000 * 60 * 5,
        retry:0
    })
}