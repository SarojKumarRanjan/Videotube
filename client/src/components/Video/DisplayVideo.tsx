import React from "react";
import VideoCard from "./VideoCard";

interface Video {
  thumbnailUrl: string;
  title: string;
  channelName: string;
  channelAvatarUrl: string;
  views: string;
  uploadedAt: string;
  duration: string;
  episodeNumber: number;
}

interface DisplayVideoProps {
  videos: Video[];
}

const DisplayVideo: React.FC<DisplayVideoProps> = ({ videos }) => {
  //console.log(videos);

  return (
    <div>
      <div className="m-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-4">
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            thumbnailUrl={video.thumbnailUrl}
            title={video.title}
            channelName={video.channelName}
            channelAvatarUrl={video.channelAvatarUrl}
            views={video.views}
            uploadedAt={video.uploadedAt}
            duration={video.duration}
            episodeNumber={video.episodeNumber}
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayVideo;
