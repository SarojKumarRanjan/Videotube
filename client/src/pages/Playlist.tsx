import PlaylistCard from "../components/Playlist/PlaylistCard"

function Playlist() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <div className="p-4">
      <PlaylistCard
        coverImage="https://images.pexels.com/photos/6642549/pexels-photo-6642549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        title="Google Docs"
        part="PART 1"
        videoCount={3}
        channelName="Kuluru Vineeth"
      />
    </div>
    <div className="p-4">
      <PlaylistCard
        coverImage="https://images.pexels.com/photos/6642549/pexels-photo-6642549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        title="Google Docs"
        part="PART 1"
        videoCount={3}
        channelName="Kuluru Vineeth"
      />
    </div>
    <div className="p-4">
      <PlaylistCard
        coverImage="https://images.pexels.com/photos/6642549/pexels-photo-6642549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        title="Google Docs"
        part="PART 1"
        videoCount={3}
        channelName="Kuluru Vineeth"
      />
    </div>
    <div className="p-4">
      <PlaylistCard
        coverImage="https://images.pexels.com/photos/6642549/pexels-photo-6642549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        title="Google Docs"
        part="PART 1"
        videoCount={3}
        channelName="Kuluru Vineeth"
      />
    </div>
    <div className="p-4">
      <PlaylistCard
        coverImage="https://images.pexels.com/photos/6642549/pexels-photo-6642549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        title="Google Docs"
        part="PART 1"
        videoCount={3}
        channelName="Kuluru Vineeth"
      />
    </div>
    <div className="p-4">
      <PlaylistCard
        coverImage="https://images.pexels.com/photos/6642549/pexels-photo-6642549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        title="Google Docs"
        part="PART 1"
        videoCount={3}
        channelName="Kuluru Vineeth"
      />
    </div>
    </div>
  )
}

export default Playlist