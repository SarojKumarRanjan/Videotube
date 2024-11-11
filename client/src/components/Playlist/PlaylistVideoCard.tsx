import { Button } from "../ui/button";
import { MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import { timeAgo } from "../../lib/timeAgo";
import { DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup
 } from "../ui/dropdown-menu";
 import { useRemoveVideoFromPlaylist } from "../../hooks/playlist.hook";
 import toast from "react-hot-toast";


interface Video {
  _id: string;
  videoFile:string
  title: string;
  description: string;
  views: string;
  createdAt: string;
  duration: string;
  thumbnail: string;
  ownerName:string
}




export default function PlaylistVideoCard( {playlistVideo,playlistId}: {playlistVideo:Video,playlistId:string} ) {
 // console.log(playlistVideo);
  
 const {mutateAsync:removeVideo} = useRemoveVideoFromPlaylist()

  const removePlaylistHandler = async() => {
    const res = await removeVideo({playlistId,videoId:playlistVideo._id})
    
    if(res){
      toast.success("Video removed from playlist")
    }
  }

  return (
    
    <div className="my-4">
      
        <div key={playlistVideo._id} className="flex flex-col md:flex-row space-x-4">
        
          <div className="flex-shrink-0 relative">
            <img
              src={playlistVideo.thumbnail}
              alt={playlistVideo.title}
              className="w-40 h-24 object-cover rounded"
            />
            <div className="absolute bottom-1 right-1 bg-black text-white text-xs px-1 rounded">
              {playlistVideo.duration}
            </div>
          </div>
          
          <div className="flex-grow">
          <Link to={`/watch/${playlistVideo._id}`}>
            <h3 className="font-semibold">{playlistVideo.title}</h3>
            
            <p className="text-sm text-gray-500">{playlistVideo.ownerName}</p>
            <p className="text-sm text-gray-500">
              {playlistVideo.views} views • {timeAgo(playlistVideo.createdAt)}
            </p>
            </Link>
          </div>
          
          
          <div className="flex-shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={removePlaylistHandler}>
                    
                    Remove from playlist
                    
                    
                    </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          
        </div>
        </div>
      
    </div>
    
    );
      }

