import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Switch } from "../ui/switch"
import { Users, Eye, ThumbsUp, Video, Search, Trash2 } from "lucide-react"
import { ScrollArea } from "../ui/scroll-area"

interface ChannelStats {
  subscribers: number
  views: number
  likes: number
  videos: number
}

interface VideoData {
  id: string
  title: string
  views: number
  likes: number
  publishDate: string
  isPublished: boolean
}

interface PlaylistData {
  id: string
  title: string
  videoCount: number
  lastUpdated: string
}

const channelStats: ChannelStats = {
  subscribers: 100000,
  views: 5000000,
  likes: 250000,
  videos: 150
}

const recentVideos: VideoData[] = [
  { id: "1", title: "How to Build a React App", views: 10000, likes: 500, publishDate: "2023-10-15", isPublished: true },
  { id: "2", title: "JavaScript Tips and Tricks", views: 8000, likes: 400, publishDate: "2023-10-10", isPublished: true },
  { id: "3", title: "CSS Flexbox Tutorial", views: 12000, likes: 600, publishDate: "2023-10-05", isPublished: false },
]

const playlists: PlaylistData[] = [
  { id: "1", title: "React Basics", videoCount: 10, lastUpdated: "2023-10-18" },
  { id: "2", title: "Advanced JavaScript", videoCount: 15, lastUpdated: "2023-10-12" },
  { id: "3", title: "CSS Mastery", videoCount: 8, lastUpdated: "2023-10-08" },
]

export default function ChannelDashboard() {
  const [videos, setVideos] = React.useState(recentVideos)

  const togglePublish = (id: string) => {
    setVideos(videos.map(video => 
      video.id === id ? { ...video, isPublished: !video.isPublished } : video
    ))
  }

  const deleteVideo = (id: string) => {
    setVideos(videos.filter(video => video.id !== id))
  }

  const deletePlaylist = (id: string) => {
    console.log(`Deleting playlist with id: ${id}`)
  }

  return (
    <div className="w-full min-h-screen p-4 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold sm:text-3xl">Channel Dashboard</h1>
      </div>
      
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{channelStats.subscribers.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{channelStats.views.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{channelStats.likes.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Videos</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{channelStats.videos}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="videos" className="space-y-4">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="videos" className="flex-1 sm:flex-none">Videos</TabsTrigger>
          <TabsTrigger value="playlists" className="flex-1 sm:flex-none">Playlists</TabsTrigger>
        </TabsList>
        
        <TabsContent value="videos" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl sm:text-2xl font-bold">Your Videos</h2>
            <Button>Upload New Video</Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="w-full sm:w-72">
              <Input type="text" placeholder="Search videos" className="w-full" />
            </div>
            <Button type="submit" className="w-full sm:w-auto">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          <ScrollArea className="w-full">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">Title</TableHead>
                    <TableHead className="hidden sm:table-cell">Views</TableHead>
                    <TableHead className="hidden sm:table-cell">Likes</TableHead>
                    <TableHead className="hidden md:table-cell">Publish Date</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {videos.map((video) => (
                    <TableRow key={video.id}>
                      <TableCell className="font-medium">{video.title}</TableCell>
                      <TableCell className="hidden sm:table-cell">{video.views.toLocaleString()}</TableCell>
                      <TableCell className="hidden sm:table-cell">{video.likes.toLocaleString()}</TableCell>
                      <TableCell className="hidden md:table-cell">{video.publishDate}</TableCell>
                      <TableCell>
                        <Switch
                          checked={video.isPublished}
                          onCheckedChange={() => togglePublish(video.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <Button variant="destructive" size="sm" onClick={() => deleteVideo(video.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="playlists" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl sm:text-2xl font-bold">Your Playlists</h2>
            <Button>Create New Playlist</Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="w-full sm:w-72">
              <Input type="text" placeholder="Search playlists" className="w-full" />
            </div>
            <Button type="submit" className="w-full sm:w-auto">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          <ScrollArea className="w-full">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">Title</TableHead>
                    <TableHead>Videos</TableHead>
                    <TableHead className="hidden sm:table-cell">Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {playlists.map((playlist) => (
                    <TableRow key={playlist.id}>
                      <TableCell className="font-medium">{playlist.title}</TableCell>
                      <TableCell>{playlist.videoCount}</TableCell>
                      <TableCell className="hidden sm:table-cell">{playlist.lastUpdated}</TableCell>
                      <TableCell>
                        <Button variant="destructive" size="sm" onClick={() => deletePlaylist(playlist.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}