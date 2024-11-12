import { getAllTweets,updateTweet,deleteTweet } from "../api/tweet.api";
import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";

export const useGetAllTweets = () => {
    return useQuery({
        queryKey: ["tweets"],
        queryFn: getAllTweets,
        staleTime: 1000 * 60 * 5,
        retry:0
    })
}

type UpdateTweetArgs = {
    tweetId: string;
    content: string;
};

export const useUpdateTweet = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({tweetId,content}:UpdateTweetArgs) => updateTweet(tweetId,content),
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