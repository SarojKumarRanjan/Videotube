
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs"
import { Bell, MoreVertical } from "lucide-react"
import { useGetUserPlaylist } from "../../hooks/playlist.hook"
import { useParams } from "react-router-dom"
import PlaylistCard from "../Playlist/PlaylistCard"
import { useVideos } from "../../hooks/video.hook"
import DisplayVideo from "../Video/DisplayVideo"
import { useGetUserChannelStat } from "../../hooks/auth.hook"
import { useSelector } from "react-redux"
import { useToggleSubscribe } from "../../hooks/subscription.hook"
import { toast } from "react-hot-toast"
import Loader from "../Loader"

export default function ChannelProfile() {
    const { channelId } = useParams();
    const {user,authStatus} = useSelector((state:any) => state.auth);
    const guest = !authStatus;
    const {mutateAsync:toggleSubscribe} = useToggleSubscribe(channelId as string);
  const { data: playlists, } = useGetUserPlaylist(channelId as string);
  //console.log(playlists);

  const { data: videos } = useVideos(channelId as string,undefined);
  //console.log(videos);

  const { data: userChannelStat, isLoading: userChannelStatLoading } = useGetUserChannelStat(channelId as string,guest);

  const handleToggleSubscribe = async   () => {
    console.log("clicked");
    

   const res = await toggleSubscribe();
   console.log(res);
   
    toast.success(userChannelStat?.isSubscribed ? "Unsubscribed" : "Subscribed");
  }


  console.log(userChannelStat);
  if(userChannelStatLoading) return <div>
    <Loader text="Loading channel profile..." />
  </div>

  return (
    <div className="w-full">
      {/* Banner */}
      <div className="relative h-40 bg-blue-600">
        <img
          src={userChannelStat?.coverImage}
          alt="Channel Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Channel Info */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <Avatar className="w-24 h-24 border-4 border-white">
            <AvatarImage src={userChannelStat?.avatar} alt="Harkirat Singh" />
            <AvatarFallback>HS</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <h1 className="text-2xl font-bold">{userChannelStat?.fullName}</h1>
            <p className="text-gray-600 dark:text-gray-400">{userChannelStat?.subscribersCount} subscribers • {userChannelStat?.totalVideos} videos</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {userChannelStat?.userName}
              {/* <button className="text-blue-600 dark:text-blue-400 ml-1">more</button> */}
            </p>
            {/* <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
              {userChannelStat?.socialMediaLinks?.map((link:any) => (
                <a href={link} className="text-blue-600 dark:text-blue-400 ml-1">{link}</a>
              ))}
            </p> */}
          </div>
          <div className="flex items-center gap-2">
            <Button
            onClick={ handleToggleSubscribe}
            variant={userChannelStat?.isSubscribed ? "default" : "outline"}
            disabled={guest || user?._id === userChannelStat?._id}
            >
              {userChannelStat?.isSubscribed ? "Subscribed" : "Subscribe"}
              <Bell className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" disabled={guest }>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>


        <Tabs defaultValue="videos" className="mt-6">
          <TabsList>

            <TabsTrigger value="videos">Videos</TabsTrigger>


            <TabsTrigger value="playlists">Playlists</TabsTrigger>
            {/* <TabsTrigger value="community">Community</TabsTrigger> */}
          </TabsList>
          <TabsContent value="videos">
            <div>
              {

                <DisplayVideo videos={videos?.pages[0]} />
              }

            </div>
          </TabsContent>
          <TabsContent value="playlists">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
              {playlists?.map((playlist: any) => (
                <PlaylistCard key={playlist._id} {...playlist} />
              ))}
            </div>
          </TabsContent>
          {/* <TabsContent value="community">
            <div>
              community
            </div>
          </TabsContent> */}
        </Tabs>





      </div>
    </div>
  )
}