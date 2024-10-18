
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { Bell, Search, MoreVertical } from "lucide-react"

export default function ChannelProfile() {
  return (
    <div className="w-full">
      {/* Banner */}
      <div className="relative h-40 bg-blue-600">
        <img
          src="https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Channel Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Channel Info */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <Avatar className="w-24 h-24 border-4 border-white">
            <AvatarImage src="https://images.pexels.com/photos/158063/bellingrath-gardens-alabama-landscape-scenic-158063.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Harkirat Singh" />
            <AvatarFallback>HS</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <h1 className="text-2xl font-bold">Harkirat Singh</h1>
            <p className="text-gray-600 dark:text-gray-400">@harkirat1 • 469K subscribers • 234 videos</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              I'm kirat, a 2018 Computer Science undergrad from IIT Roorkee. I've been part of Google...
              <button className="text-blue-600 dark:text-blue-400 ml-1">more</button>
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
              twitter.com/kirat_tw and 5 more links
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-gray-100 text-gray-800 hover:bg-gray-200">
              Subscribed
              <Bell className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <Tabs defaultValue="home" className="mt-6">
          <TabsList>
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="live">Live</TabsTrigger>
            
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search Icon */}
        <div className="mt-4 flex justify-end">
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>

        {/* Featured Video */}
        <div className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 relative">
                  <img
                    src="https://images.pexels.com/photos/158063/bellingrath-gardens-alabama-landscape-scenic-158063.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Video Thumbnail"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <div className="absolute bottom-2 right-2 bg-black text-white text-xs px-1 rounded">
                    3:47
                  </div>
                </div>
                <div className="p-4 md:w-3/5">
                  <h2 className="text-xl font-semibold">Four years after IIT in Four Minutes</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Harkirat Singh • 1.2M views • 1 year ago
                  </p>
                  <p className="mt-2 text-sm">
                    The video describes my journey 4 years after graduating from IIT Roorkee. Hope you all like it My links
                    https://twitter.com/kirat_tw https://linkedin.com/in/kirat-li https://www.instagram.com/kir...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    )
}