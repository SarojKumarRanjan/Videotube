import React from 'react';
import ReactPlayer from 'react-player/lazy';
import { useUpdateWatchHistory } from '../../hooks/video.hook';
interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl?: string;
  videoId:string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, thumbnailUrl,videoId }) => {
  const { mutateAsync:updateWatchHistory } = useUpdateWatchHistory();
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <ReactPlayer
        url={videoUrl}
        controls={true} // Enables built-in controls
        width="100%"
        height="100%"
        light={thumbnailUrl} // Shows the thumbnail until playback starts
        onPlay={() => {
          updateWatchHistory(videoId);
        }}
      />
    </div>
  );
};

export default VideoPlayer;
