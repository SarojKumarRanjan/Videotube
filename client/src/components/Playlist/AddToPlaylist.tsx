/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { MoreVertical, X } from "lucide-react";
import { useGetYourPlaylist } from "../../hooks/playlist.hook";
import { useAddVideoToPlaylist } from "../../hooks/playlist.hook";
import { useCreatePlaylist } from "../../hooks/playlist.hook";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

interface AddToPlaylistProps {
  videoId: string;
}

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

function AddToPlaylist({ videoId }: AddToPlaylistProps) {

  //@ts-ignore
  const user = useSelector((state) => state?.auth?.authStatus)

  const {mutateAsync:createPlaylist} = useCreatePlaylist()

  const {mutateAsync:addVideo} = useAddVideoToPlaylist()


  const{data,error,isError,isLoading} = useGetYourPlaylist()

  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [newPlaylistDescription, setNewPlaylistDescription] = useState("");

 

  const handleAddToPlaylist = async(playlistId: string) => {

   const res = await addVideo({playlistId,videoId})

 // console.log(res);
  if (res) {
    toast.success(`Video added to playlist ${res?.data?.name}`);
    
  }
  
  
   // console.log(`Adding video ${videoId} to playlist ${playlistId}`);
    setShowPlaylistModal(false);
  };

  const handleCreatePlaylist = (e: React.FormEvent) => {
    e.preventDefault();
    createPlaylist({name:newPlaylistName,description:newPlaylistDescription})

    setNewPlaylistName("");
    setShowCreateForm(false);
  };



  if(isLoading){
    return(
      <div>
        loading....
      </div>
    )
  }

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem  onClick={() => setShowPlaylistModal(user?true:false)}>
              {
                user? "Add to Playlist":<Link to={"login"}>Login to add to Playlist</Link>
              }
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal Overlay */}
      {showPlaylistModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card text-card-foreground rounded-lg shadow-lg w-full max-w-md mx-4 border">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">
                  {showCreateForm ? "Create New Playlist" : "Add to Playlist"}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full"
                  onClick={() => {
                    setShowPlaylistModal(false);
                    setShowCreateForm(false);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {!showCreateForm ? (
                <>
                  <div className="space-y-2 mb-4">
                    {
                      isError && <div>{error?.message}</div>
                    }
                    {
                      data.length === 0 && <div>No playlist found, create one to add video</div>
                    }
                    {data.map((playlist:PlaylistResponse) => (
                      <button
                        key={playlist._id}
                        onClick={() => handleAddToPlaylist(playlist._id)}
                        className="w-full text-left p-3 hover:bg-accent hover:text-accent-foreground rounded-lg flex justify-between items-center transition-colors"
                      >
                        <span className="font-medium">{playlist.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {playlist.totalVideos} videos
                        </span>
                      </button>
                    ))}
                  </div>
                  <Button
                    onClick={() => setShowCreateForm(true)}
                    className="w-full"
                  >
                    Create New Playlist
                  </Button>
                </>
              ) : (
                <form onSubmit={handleCreatePlaylist} className="space-y-4">
                  <div>
                    <label
                      htmlFor="playlistName"
                      className="block text-sm font-medium text-foreground mb-1"
                    >
                      Playlist Name
                    </label>
                    <Input
                      id="playlistName"
                      value={newPlaylistName}
                      onChange={(e) => setNewPlaylistName(e.target.value)}
                      placeholder="Enter playlist name"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="playlistDescription"
                      className="block text-sm font-medium text-foreground mb-1"
                    >
                      Playlist Description
                    </label>
                    <Input
                      id="playlistDescription"
                      value={newPlaylistDescription}
                      onChange={(e) => setNewPlaylistDescription(e.target.value)}
                      placeholder="Enter playlist description"
                      className="w-full"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowCreateForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1">
                      Create
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddToPlaylist;