/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useParams } from "react-router-dom";
import { useGetRecomendedVideos } from "../../hooks/video.hook";
import { timeAgo } from "../../lib/timeAgo";
import { Link } from "react-router-dom";
import formatVideoDuration from "../../lib/durationFormat";

type owner = {
  _id: string;
  userName: string;
  avatar: string;
};

interface Video {
  _id: string;
  videoFile: string;
  thumbnail: string;
  title: string;
  owner: string;
  description: string;
  duration: number;
  views: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
  ownerDetails: owner;
}

function RecomendedVideo() {
  const { videoId } = useParams<{ videoId: string }>();
  //@ts-ignore
  const { data: recommendedVideos, error, isError, isLoading } = useGetRecomendedVideos(videoId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error?.message}</div>;

  return (
    <div className="lg:w-3/12">
      <h3 className="text-xl font-bold mb-4">Recommended Videos</h3>
      {recommendedVideos.map((video: Video) => (
        <Link to={`/watch/${video?._id}`} key={video._id}>
          <div className="flex gap-2 mb-4">
            <div className="relative w-36 h-24">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover rounded"
              />
              <span className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs font-semibold py-[2px] px-[4px] rounded">
                {formatVideoDuration(video.duration)}
              </span>
            </div>
            <div>
              <h4 className="mb-[3px] text-sm font-semibold line-clamp-2">
                {video.title}
              </h4>
              <p className="text-sm mb-[1px] text-gray-500">
                {video?.ownerDetails?.userName}
              </p>
              <p className="text-xs text-gray-500">
                {video.views} views • {timeAgo(video.createdAt)}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default RecomendedVideo;
