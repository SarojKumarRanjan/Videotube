/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useParams } from "react-router-dom";
import { useGetRecomendedVideos } from "../../hooks/video.hook";
import { timeAgo } from "../../lib/timeAgo";
import { Link } from "react-router-dom";

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
function RecomendedVideo() {
  const { videoId } = useParams<{ videoId: string }>();
  //@ts-ignore
  const { data: recommendedVideos, error, isError, isLoading } = useGetRecomendedVideos(videoId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error?.message}</div>;
  return (
    <div className="lg:w-3/12">
      <h3 className="text-xl font-bold mb-4">Recommended Videos</h3>
      
        {recommendedVideos.map((video:Video) => (
          <Link to={`/watch/${video?._id}`}>
          <div key={video._id} className="flex gap-2 mb-4">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-36 h-24 object-cover rounded"
            />
            <div>
              <h4 className="mb-[3px] text-sm font-semibold line-clamp-2">{video.title}</h4>
              <p className="text-sm mb-[1px] text-gray-500">{video?.ownerDetails?.userName}</p>
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
