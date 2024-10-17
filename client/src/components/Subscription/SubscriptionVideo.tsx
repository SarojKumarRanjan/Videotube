/* eslint-disable @typescript-eslint/no-unused-vars */
import VideoCard from "../Video/VideoCard";

const video = [1,2,3,4,5,6,7,89,10];


function SubscriptionVideo() {
  return (
    <div className="m-6">
        <h2 className="text-xl font-semibold mb-4">Latest from your subscriptions</h2>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {video.map((video) => (
            <VideoCard key={video}
            thumbnailUrl="https://images.pexels.com/photos/1848662/pexels-photo-1848662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            title="INDIA'S GOT LATENT | EP 08 ft. Poonam Pandey @viditchess @vivekmagic..."
            channelName="Samay Raina"
            channelAvatarUrl="/samay-raina-avatar.jpg"
            views="4M views"
            uploadedAt="16 hours ago"
            duration="54:32"
            episodeNumber={8}
            />
        ))}
      </div>
    </div>
  )
}

export default SubscriptionVideo