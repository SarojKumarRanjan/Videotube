import { Button } from "../ui/button";
import { MoreVertical } from "lucide-react";


interface Video {
  id: string;
  title: string;
  channel: string;
  views: string;
  uploadTime: string;
  duration: string;
  thumbnail: string;
}

interface PlaylistVideoCardProps {
    playlistVideo: Video;
  }


export default function PlaylistVideoCard( {playlistVideo}:PlaylistVideoCardProps) {
  return (
    <div className="my-4">
      
        <div key={playlistVideo.id} className="flex flex-col md:flex-row space-x-4">
          
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
            <h3 className="font-semibold">{playlistVideo.title}</h3>
            <p className="text-sm text-gray-500">{playlistVideo.channel}</p>
            <p className="text-sm text-gray-500">
              {playlistVideo.views} • {playlistVideo.uploadTime}
            </p>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      
    </div>
    );
      }

