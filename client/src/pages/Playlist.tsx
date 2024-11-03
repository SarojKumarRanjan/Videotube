import PlaylistCard from "../components/Playlist/PlaylistCard"
import { useGetYourPlaylist } from "../hooks/playlist.hook"


interface PlaylistResponse {
  coverImage: string;
  name: string;
  description: string;
  totalVideos: number;
  updatedAt: string;
  totalViews:number
  _id:string
  totalDuration:number
}

function Playlist() {
  
  const{data,error,isError,isLoading} = useGetYourPlaylist()
  console.log(data);

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {
        data.map((playlist:PlaylistResponse) => (
          <div key={playlist?._id} className="p-4">
      <PlaylistCard
      _id={playlist?._id}
        coverImage={playlist?.coverImage}
        title={playlist?.name}
        totalViews={playlist?.totalViews}
        videoCount={playlist?.totalVideos}
        description={playlist?.description}
        totalDuration={playlist?.totalDuration}
      />
    </div>
        ))
      }

    </div>
  )
}

export default Playlist