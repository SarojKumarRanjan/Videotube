
import DisplayVideo from "../Video/DisplayVideo";
import { videos } from "../../constant";



function SubscriptionVideo() {
  return (
    <div >
    <h2 className=" m-6 text-xl font-semibold mb-4">Latest from your subscriptions</h2>
   <DisplayVideo videos={videos}/>
   </div>
  )
}

export default SubscriptionVideo