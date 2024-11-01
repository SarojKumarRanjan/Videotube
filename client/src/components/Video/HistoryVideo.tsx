import DisplayVideo from "./DisplayVideo"

import { useWatchHistory } from "../../hooks/video.hook";


export default function HistoryVideo() {
    const {data,isError,error,isLoading} = useWatchHistory()

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
                loading....
            </div>
        )
    }
  return (
    <div>
        <h2 className=" m-6 text-xl font-semibold mb-4">Your History</h2>
         <DisplayVideo videos={data}/>
    </div>
  )
}
