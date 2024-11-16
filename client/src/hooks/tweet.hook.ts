/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getAllTweets,updateTweet,deleteTweet,createTweet } from "../api/tweet.api";
import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useGetAllTweets = () => {
    //@ts-ignore
    const guest = useSelector((state) => !state?.auth?.authStatus);
    return useQuery({
        queryKey: ["tweets"],
        queryFn: () => getAllTweets(guest), 
        staleTime: 1000 * 60 * 5,
        retry: 0
    });
};


type UpdateTweetArgs = {
    tweetId: string;
    content: string;
    tweetImage: File;
};

export const useUpdateTweet = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({tweetId,content,tweetImage}:UpdateTweetArgs) => updateTweet(tweetId,content,tweetImage),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tweets"]
            });
        }

    });
}

export const useDeleteTweet = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (tweetId:string) => deleteTweet(tweetId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tweets"]
            });
        }
    });
}

export const useCreateTweet = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({content,tweetImage}:{
            content:string,
            tweetImage:File
        }) => createTweet(content,tweetImage),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tweets"]
            });
        }
    });
}