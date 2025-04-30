import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import { timeAgo } from "../../lib/timeAgo";
import { lazy ,Suspense} from "react";
import formatVideoDuration from "../../lib/durationFormat";


const AddToPlaylist = lazy(() => import("../Playlist/AddToPlaylist"));

 

interface VideoCardProps {
  _id: string;
  thumbnailUrl?: string;
  title?: string;
  channelName?: string;
  channelAvatarUrl?: string;
  views?: number;
  uploadedAt: string;
  duration?: number;
  channelId?: string;
}

export default function VideoCard({
  _id,
  thumbnailUrl,
  title,
  channelName,
  channelAvatarUrl,
  views,
  uploadedAt,
  duration,
  channelId,
}: VideoCardProps) {

//console.log("VideoCardProps", _id, thumbnailUrl, title, channelName, channelAvatarUrl, views, uploadedAt, duration);


  return (
    
      <Card className="w-full max-w-[570px] overflow-hidden">
        <div className="relative">
          <Link to={`/watch/${_id}`}>
          <img
            src={thumbnailUrl || "/placeholder.svg?height=200&width=360"}
            alt={title || "Video thumbnail"}
            className="w-full aspect-video object-cover"
          />
          </Link>
          {duration && (
            <span className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs font-semibold py-[2px] px-[4px] rounded">
            {formatVideoDuration(duration)}
          </span>
          )}
        </div>
        <CardContent className="p-3">
          <div className="flex justify-between items-start">
          <Link to={`/watch/${_id}`}>
            <h2 className="font-bold text-sm mb-2 line-clamp-2 flex-grow">{title || "Video Title"}</h2>
            </Link>
            <div>

            <Suspense fallback={<div>Loading...</div>}>
              <AddToPlaylist videoId={_id} /> 
            </Suspense>
            
            </div>
            
          </div>
          <div className="flex items-center mt-2">
            <Avatar className="h-9 w-9 mr-3">
              <Link to={`/channel/${channelId}`}>
              <AvatarImage src={channelAvatarUrl} alt={channelName || "Channel"} />
              <AvatarFallback>{channelName?.[0] || "C"}</AvatarFallback>
              </Link>
            </Avatar>
            <div>
              <p className="text-sm text-muted-foreground">
                <Link to={`/channel/${channelId}`}>
                {channelName || "Channel Name"}
                </Link>
                </p>
              <p className="text-xs text-muted-foreground">
                {views ? `${views} views` : "0 views"} • {timeAgo(uploadedAt) || "Recently"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
   
  );
}
