

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  channel: string;
  views: string;
  timestamp: string;
}

const recommendedVideos: Video[] = [
  {
    id: 1,
    title: "10 Amazing Facts About Space",
    thumbnail: "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    channel: "Space Explorers",
    views: "1.2M views",
    timestamp: "2 weeks ago",
  },
  {
    id: 1,
    title: "10 Amazing Facts About Space",
    thumbnail: "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    channel: "Space Explorers",
    views: "1.2M views",
    timestamp: "2 weeks ago",
  },
  {
    id: 1,
    title: "10 Amazing Facts About Space",
    thumbnail: "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    channel: "Space Explorers",
    views: "1.2M views",
    timestamp: "2 weeks ago",
  },
  {
    id: 1,
    title: "10 Amazing Facts About Space",
    thumbnail: "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    channel: "Space Explorers",
    views: "1.2M views",
    timestamp: "2 weeks ago",
  },
  {
    id: 1,
    title: "10 Amazing Facts About Space",
    thumbnail: "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    channel: "Space Explorers",
    views: "1.2M views",
    timestamp: "2 weeks ago",
  },
  {
    id: 1,
    title: "10 Amazing Facts About Space",
    thumbnail: "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    channel: "Space Explorers",
    views: "1.2M views",
    timestamp: "2 weeks ago",
  },
  {
    id: 1,
    title: "10 Amazing Facts About Space",
    thumbnail: "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    channel: "Space Explorers",
    views: "1.2M views",
    timestamp: "2 weeks ago",
  },
  
  // Add more recommended videos as needed
];

function RecomendedVideo() {
  return (
    <div className="lg:w-3/12">
      <h3 className="text-xl font-bold mb-4">Recommended Videos</h3>
      
        {recommendedVideos.map((video) => (
          <div key={video.id} className="flex gap-2 mb-4">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-36 h-24 object-cover rounded"
            />
            <div>
              <h4 className="mb-[3px] text-sm font-semibold line-clamp-2">{video.title}</h4>
              <p className="text-sm mb-[1px] text-gray-500">{video.channel}</p>
              <p className="text-xs text-gray-500">
                {video.views} • {video.timestamp}
              </p>
            </div>
          </div>
        ))}
      
    </div>
  );
}

export default RecomendedVideo;
