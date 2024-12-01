import { getSubscribedChannels,toggleSubscribe } from "../api/subscription.api";
import { useQuery,useMutation, useQueryClient } from "@tanstack/react-query";


export const useGetSubscribedChannels = () => {
  return useQuery(
    {
        queryKey: ["subscribedChannels"],
        queryFn: getSubscribedChannels,
        staleTime: 1000 * 60 * 5,//5 minutes
        retry:0
    }
  );
}

export const useToggleSubscribe = (channelId:string,videoId?:string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => toggleSubscribe(channelId),
    onSuccess:() => {
      queryClient.invalidateQueries({queryKey:["userChannelStat",channelId]})
      queryClient.invalidateQueries({queryKey:["video",videoId]})
    }
  });
};