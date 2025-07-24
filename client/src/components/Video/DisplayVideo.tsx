import React from "react";
import VideoCard from "./VideoCard";
import Loader from "../Loader";


type owner = {
    _id:string
    userName:string
    avatar:string
}

interface Video {
  _id:string
  videoFile:string
  thumbnail: string;
  title: string;
  owner:string
  description:string
  duration:number
  views:number
  isPublished:boolean
  createdAt:string
  updatedAt:string
  __v?:number
  ownerDetails:owner
}

interface DisplayVideoProps {
  videos: Video[];
  isLoading?: boolean;
}

const DisplayVideo: React.FC<DisplayVideoProps> = ({ videos,isLoading }) => {
  //console.log(videos);

 



  return (
    <div>
      {
        isLoading && (
          <div className="flex items-center justify-center h-full">
            <Loader text="Loading videos..." />
          </div>
        )
      }
      <div className="m-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-4">
        {videos.map((singleVideo:Video) => (
          <VideoCard
            key={singleVideo._id}
            _id={singleVideo._id}
            thumbnailUrl={singleVideo.thumbnail}
            title={singleVideo.title}
            channelName={singleVideo?.ownerDetails?.userName}
            channelAvatarUrl={singleVideo?.ownerDetails?.avatar}
            views={singleVideo.views}
            uploadedAt={singleVideo.createdAt}
            duration={singleVideo.duration}
            channelId={singleVideo.ownerDetails?._id}
            
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayVideo;
