
import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DisplayVideo from "../components/Video/DisplayVideo";
import { useVideos } from "../hooks/video.hook";
import { useInView } from 'react-intersection-observer';


export const SearchPage: FC = () => {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const { ref, inView } = useInView();

  
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useVideos(undefined, query);

 
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParam = params.get("query");
    if (queryParam && queryParam !== query) {
      setQuery(queryParam);
    }
  }, [location.search,query]);

  
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error?.message}
      </div>
    );
  }

  if (data?.pages[0].length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        No videos found for the search query: "{query}"
      </div>
    );
  }

  if (isFetchingNextPage) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Fetching more
      </div>
    );
  }





  return (
    <div className="">
        <div className="mx-6 mt-4">
      <h1 className="text-xl font-semibold">Showing Search Results for {" ' "+query+" '"}</h1>
      
      </div>
      <div ref={ref}>
      <DisplayVideo videos={data?.pages[0]}/>
    </div>
    </div>
  );
};
