
import DisplayVideo from "../Video/DisplayVideo";

const videos = [
    {
      thumbnailUrl: "https://images.pexels.com/photos/158063/bellingrath-gardens-alabama-landscape-scenic-158063.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "INDIA'S GOT LATENT | EP 08 ft. Poonam Pandey @viditchess @vivekmagic...",
      channelName: "Samay Raina",
      channelAvatarUrl: "/samay-raina-avatar.jpg",
      views: "4M views",
      uploadedAt: "16 hours ago",
      duration: "54:32",
      episodeNumber: 8
    },
    {
      thumbnailUrl: "https://images.pexels.com/photos/158063/bellingrath-gardens-alabama-landscape-scenic-158063.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Another Interesting Video",
      channelName: "Some Channel",
      channelAvatarUrl: "/some-channel-avatar.jpg",
      views: "1M views",
      uploadedAt: "2 days ago",
      duration: "10:15",
      episodeNumber: 1
    },
    
  ];


function SubscriptionVideo() {
  return (
    <div >
    <h2 className=" m-6 text-xl font-semibold mb-4">Latest from your subscriptions</h2>
   <DisplayVideo videos={videos}/>
   </div>
  )
}

export default SubscriptionVideo