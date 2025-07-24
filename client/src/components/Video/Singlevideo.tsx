/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { lazy ,Suspense} from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ThumbsUp, Bell } from "lucide-react";
import Comment from "../Comments/Comments";
import { useGetVideoById } from "../../hooks/video.hook";
import VideoPlayer from "./VideoPlayer";
import { useVideoLike } from "../../hooks/like.hook";
import { useToggleSubscribe } from "../../hooks/subscription.hook";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Loader from "../Loader";

const AddToPlaylist = lazy(() => import("../Playlist/AddToPlaylist"));

export default function SingleVideo() {
  const { videoId } = useParams<{ videoId: string }>();

  const { user, authStatus } = useSelector((state:any) => state.auth);
  const guest = !authStatus;

  const { mutateAsync: likeVideo } = useVideoLike();

  const handleLike = async () => {
    try {
      //@ts-ignore
      await likeVideo(videoId);
    } catch (error) {
      console.log(error);
    }
  };

  //@ts-ignore
  const { data: video, error, isError, isLoading } = useGetVideoById(videoId);

  //console.log(video);

  const { mutateAsync: toggleSubscribe } = useToggleSubscribe(
    video?.owner?._id as string,
    videoId as string
  );

  const handleToggleSubscribe = async () => {
    const res = await toggleSubscribe();
    toast.success(res?.message);
  };

  if (isLoading) return <div>
    <Loader text="Loading video..." />
  </div>;
  if (isError) return <div>{error?.message}</div>;

  //console.log(video);

  return (
    <div className="lg:w-8/12">
      <div className="aspect-video  mb-4">
        {/* Video player container */}
        <div className="w-full h-full flex items-center justify-center text-2xl text-gray-500">
          <VideoPlayer
            videoId={videoId as string}
            videoUrl={video?.videoFile}
            thumbnailUrl={video?.thumbnail}
          />
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-2">{video?.title}</h1>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-4">
            <AvatarImage src={video?.owner?.avatar} alt="Channel Name" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{video?.owner?.userName}</h2>
            <p className="text-sm text-gray-500">
              {video?.owner?.subscriberCount} subscribers
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleToggleSubscribe}
            variant={video?.owner?.isSubscribed ? "default" : "outline"}
            disabled={guest || user?._id === video?.owner?._id}
          >
            {video?.owner?.isSubscribed ? "Subscribed" : "Subscribe"}
            <Bell className="ml-2 h-4 w-4" />
          </Button>

          

          

          <Button
            onClick={handleLike}
            className="w-full p-2"
            variant={video.isLiked ? "default" : "outline"}
            size="icon"
          >
            <ThumbsUp className="h-4 w-4 mr-2" />
            {video?.likesCount}
          </Button>

          <Suspense fallback={<div>Loading...</div>}>
              <AddToPlaylist videoId={videoId as string} /> 
            </Suspense>

        </div>
      </div>
      <div className="mb-4 text-sm text-gray-500">
        {video?.views} views • 1 week ago
      </div>
      <Accordion type="single" collapsible className="mb-8">
        <AccordionItem value="description">
          <AccordionTrigger>Description</AccordionTrigger>
          <AccordionContent>
            <p className="p-4">{video?.description}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div>
        <Comment />
      </div>
    </div>
  );
}
