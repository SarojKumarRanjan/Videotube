import { getSubscribedChannels } from "../api/subscription.api";
import { useQuery } from "@tanstack/react-query";


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