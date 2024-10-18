import DisplayVideo from "../components/Video/DisplayVideo"
import { videos } from "../constant"
import { useParams } from "react-router-dom"

function PlaylistVideoPage() {
    const { playlistId } = useParams()
  return (
    <div>
        <h2 className=" m-6 text-xl font-semibold mb-4">{playlistId } Videos</h2>
        <DisplayVideo videos={videos}/>
    </div>
  )
}

export default PlaylistVideoPage