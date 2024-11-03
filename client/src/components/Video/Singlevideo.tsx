import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ThumbsUp} from "lucide-react";
import Comment from "../Comments/Comments";
import { useGetVideoById } from "../../hooks/video.hook";
import VideoPlayer from "./VideoPlayer";
import { useVideoLike } from "../../hooks/like.hook";

export default function SingleVideo() {
  const { videoId } = useParams<{ videoId: string }>();

  const { mutateAsync:likeVideo } = useVideoLike();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore

const handleLike = async () => {
    try {
      await likeVideo(videoId);
    } catch (error) {
      console.log(error);
    }
  }

  const { data: video,error,isError,isLoading } = useGetVideoById(videoId);
  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>{error?.message}</div>

  return (
    <div className="lg:w-8/12">
      <div className="aspect-video  mb-4">
        {/* Video player container */}
        <div className="w-full h-full flex items-center justify-center text-2xl text-gray-500">
          <VideoPlayer videoUrl={video?.videoFile} thumbnailUrl={video?.thumbnail} />
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-2">{ video?.title}</h1>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-4">
            <AvatarImage
              src={video?.owner?.avatar}
              alt="Channel Name"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{video?.owner?.userName}</h2>
            <p className="text-sm text-gray-500">1M subscribers</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Subscribe</Button>
          <Button onClick={handleLike} className="w-full p-2" variant="outline" size="icon">
            <ThumbsUp className="h-4 w-4 mr-2" />
            {video?.likesCount}
          </Button>
          
        </div>
      </div>
      <div className="mb-4 text-sm text-gray-500">{ video?.views} views • 1 week ago</div>
      <Accordion type="single" collapsible className="mb-8">
        <AccordionItem value="description">
          <AccordionTrigger>Description</AccordionTrigger>
          <AccordionContent>
            <p className="p-4">
              {video?.description}
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div>
       
        <Comment />
      </div>
    </div>
  );
}
