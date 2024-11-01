import React from 'react';
import ReactPlayer from 'react-player/lazy';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, thumbnailUrl }) => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <ReactPlayer
        url={videoUrl}
        controls={true} // Enables built-in controls
        width="100%"
        height="100%"
        light={thumbnailUrl} // Shows the thumbnail until playback starts
      />
    </div>
  );
};

export default VideoPlayer;
