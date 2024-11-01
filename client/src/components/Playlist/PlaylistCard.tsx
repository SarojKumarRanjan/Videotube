import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { PlayCircle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaylistCardProps {
  coverImage: string;
  title: string;
  _id:string
  videoCount: number;
  totalViews:number;
  description:string
  totalDuration:number
}

export default function PlaylistCard({
  coverImage,
  title,
  _id,
  videoCount,
  
  description,
  totalDuration
  
}: PlaylistCardProps) {
  return (
    <div className="w-full max-w-[570px]">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-video group">
            <img
              src={coverImage}
              alt={`${title} playlist cover`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0  flex flex-col justify-between p-4">
              <div className="flex justify-between items-start"></div>

              <div className="flex flex-col items-center justify-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link to={`${_id}`}>
                <Button variant="secondary" className="flex items-center">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Play all
                </Button>
                </Link>
              </div>

              <div className="self-end">
                <div className="p-1 absolute bottom-2 right-2 bg-black text-white text-xs px-1 rounded">
                  {videoCount} Videos
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-2">
        <h3 className="font-semibold text-md">{title}</h3>
        <div className="flex items-center text-sm text-gray-500">
          <span>{description}</span>
          <CheckCircle2 className="h-4 w-4 ml-1 text-gray-400" />
          <span className="mx-1">•</span>
          <span>Duration : {totalDuration} </span>
        </div>
        <Link to={`${_id}`}>
          <div className="text-sm text-gray-500">View full playlist</div>
        </Link>
      </div>
    </div>
  );
}
