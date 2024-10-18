import DisplayVideo from "./DisplayVideo";
import { videos } from "../../constant";



function LikedVideos() {
  return (
    <div >
    <h2 className=" m-6 text-xl font-semibold mb-4">Latest from your Liked Videos</h2>
   <DisplayVideo videos={videos}/>
   </div>
  )
}

export default LikedVideos