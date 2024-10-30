import DisplayVideo from "./DisplayVideo";

import { useGetLikedVideo } from "../../hooks/like.hook";



function LikedVideos() {
    const {data,error,isError,IsLoading} =  useGetLikedVideo()
    //console.log(data);
    
  return (
    <div >
    <h2 className=" m-6 text-xl font-semibold mb-4">Latest from your Liked Videos</h2>
   <DisplayVideo videos={data}/>
   </div>
  )
}

export default LikedVideos