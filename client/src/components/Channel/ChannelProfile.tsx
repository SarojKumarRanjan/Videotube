
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"

import { Tabs, TabsList, TabsTrigger,TabsContent } from "../ui/tabs"
import { Bell, MoreVertical } from "lucide-react"

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

        
        <Tabs defaultValue="home" className="mt-6">
          <TabsList>
            
            <TabsTrigger value="videos">Videos</TabsTrigger>
            
            
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>
          <TabsContent value="videos">
            <div>
              videos
            </div>
          </TabsContent>
          <TabsContent value="playlists">
            <div>
              playlists
            </div>
          </TabsContent>
          <TabsContent value="community">
            <div>
              community
            </div>
          </TabsContent>
        </Tabs>


        

       
      </div>
    </div>
    )
}