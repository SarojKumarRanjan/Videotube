
import { Card, CardContent } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Link } from "react-router-dom"
import { timeAgo } from "../../lib/timeAgo"

interface VideoCardProps {
  _id:string
  thumbnailUrl?: string
  title?: string
  channelName?: string
  channelAvatarUrl?: string
  views?: number
  uploadedAt: string
  duration?: number
  
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
 
}: VideoCardProps) {
  
  return (
    <Link to={`/watch/${_id}`}>
    <Card className="w-full max-w-[570px] overflow-hidden">
      <div className="relative">
        <img
          src={thumbnailUrl || "/placeholder.svg?height=200&width=360"}
          alt={title || "Video thumbnail"}
          className="w-full aspect-video object-cover"
        />
        
        
        {duration && (
          <div className="absolute bottom-2 right-2 bg-black text-white text-xs px-1 rounded">
            {duration}
          </div>
        )}
      </div>
      <CardContent className="p-3">
        <h2 className="font-bold text-sm mb-2 line-clamp-2">{title || "Video Title"}</h2>
        <div className="flex items-start">
          <Avatar className="h-9 w-9 mr-3">
            <AvatarImage src={channelAvatarUrl} alt={channelName || "Channel"} />
            <AvatarFallback>{channelName?.[0] || "C"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-muted-foreground">
              {channelName || "Channel Name"}
            </p>
            <p className="text-xs text-muted-foreground">
              {views+" views" || "0 views"} • {timeAgo(uploadedAt) || "Recently"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>
  )
}