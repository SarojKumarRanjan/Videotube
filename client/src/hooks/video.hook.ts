import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllVideo } from "../api/video.api";

 



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