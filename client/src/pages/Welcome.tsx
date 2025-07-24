

import DisplayVideo from "../components/Video/DisplayVideo";

import { useVideos } from "../hooks/video.hook";
import { useEffect } from "react";

import Loader from "../components/Loader";

import { useInView } from 'react-intersection-observer';




  // Create an intersection observer for infinite scroll
 


function Welcome() {

  const { ref, inView } = useInView();

  // Use our custom hook with a limit of 12 videos per page
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useVideos();

  // Fetch next page when the last element comes into view
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);


//console.log(data?.pages[0]);

if(isLoading && !data){
  return (
    <div className="h-full w-full">
      <Loader text="Loading Please Wait..." />
    </div>
  )
}

if(isError){
  return(
    <div>
      {error?.message}
    </div>
  )
}

if(isFetchingNextPage){
  return(
    <div>
      Fetching next page
    </div>
  )
}

  return (
    <div ref={ref}>
      <DisplayVideo isLoading={isLoading} videos={data?.pages[0]}/>
    </div>
  );
}

export default Welcome;
