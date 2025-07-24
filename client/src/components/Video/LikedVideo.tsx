import DisplayVideo from "./DisplayVideo";

import { useGetLikedVideo } from "../../hooks/like.hook";
import Loader from "../Loader";



function LikedVideos() {
    const {data,error,isError,isLoading} =  useGetLikedVideo()
    //console.log(data);
    if(isError){
        return(
            <div>
                {error?.message}
            </div>
        )
    }
    if(isLoading){
        return(
            <div>
                <Loader text="Loading liked videos..." />
            </div>
        )
    }
   
    
  return (
    <div >
    <h2 className=" m-6 text-xl font-semibold mb-4">Latest from your Liked Videos</h2>
   <DisplayVideo videos={data}/>
   </div>
  )
}

export default LikedVideos