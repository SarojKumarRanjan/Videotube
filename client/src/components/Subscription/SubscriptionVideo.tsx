/* eslint-disable @typescript-eslint/ban-ts-comment */

import DisplayVideo from "../Video/DisplayVideo";

import { useSubscribedVideos } from "../../hooks/video.hook";



function SubscriptionVideo() {
  const { data: videos,isError,isLoading,error } = useSubscribedVideos();
  if (isLoading) return <div>Loading...</div>;
  //@ts-ignore
  if (isError) return <div>Error: {error?.response?.data?.error}</div>;
  //console.log(videos);
  
  if(videos?.data.length == 0) return <div className="text-center mt-32">No videos found please subscribe any channel to see the videos</div>
  return (
    <div >
    <h2 className=" m-6 text-xl font-semibold mb-4">Latest from your subscriptions</h2>
   <DisplayVideo videos={videos?.data}/>
   </div>
  )
}

export default SubscriptionVideo