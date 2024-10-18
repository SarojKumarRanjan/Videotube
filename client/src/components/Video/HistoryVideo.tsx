import DisplayVideo from "./DisplayVideo"
import { videos } from "../../constant";



export default function HistoryVideo() {
  return (
    <div>
        <h2 className=" m-6 text-xl font-semibold mb-4">Your History</h2>
         <DisplayVideo videos={videos}/>
    </div>
  )
}
