import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Switch } from "../ui/switch"
import { Users, Eye, ThumbsUp, Video, Search, Trash2 } from "lucide-react"
//mport { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

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

/* interface DailyStats {
  date: string
  views: number
  subscribers: number
} */

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

/* const dailyStats: DailyStats[] = [
  { date: "2023-10-01", views: 5000, subscribers: 98500 },
  { date: "2023-10-02", views: 5200, subscribers: 98700 },
  { date: "2023-10-03", views: 5100, subscribers: 98900 },
  { date: "2023-10-04", views: 5300, subscribers: 99100 },
  { date: "2023-10-05", views: 5400, subscribers: 99300 },
  { date: "2023-10-06", views: 5600, subscribers: 99600 },
  { date: "2023-10-07", views: 5800, subscribers: 100000 },
]
 */
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
    // In a real app, you'd update this state and sync with backend
    console.log(`Deleting playlist with id: ${id}`)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Channel Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{channelStats.subscribers.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{channelStats.views.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{channelStats.likes.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Videos</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{channelStats.videos}</div>
          </CardContent>
        </Card>
      </div>

     {/*  <Card className="mb-8">
        <CardHeader>
          <CardTitle>Channel Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="views" stroke="#8884d8" />
              <Line yAxisId="right" type="monotone" dataKey="subscribers" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}

      <Tabs defaultValue="videos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
        </TabsList>
        <TabsContent value="videos" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Videos</h2>
            <Button>Upload New Video</Button>
          </div>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="Search videos" />
            <Button type="submit">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Likes</TableHead>
                <TableHead>Publish Date</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {videos.map((video) => (
                <TableRow key={video.id}>
                  <TableCell className="font-medium">{video.title}</TableCell>
                  <TableCell>{video.views.toLocaleString()}</TableCell>
                  <TableCell>{video.likes.toLocaleString()}</TableCell>
                  <TableCell>{video.publishDate}</TableCell>
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
        </TabsContent>
        <TabsContent value="playlists" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Playlists</h2>
            <Button>Create New Playlist</Button>
          </div>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="Search playlists" />
            <Button type="submit">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Videos</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {playlists.map((playlist) => (
                <TableRow key={playlist.id}>
                  <TableCell className="font-medium">{playlist.title}</TableCell>
                  <TableCell>{playlist.videoCount}</TableCell>
                  <TableCell>{playlist.lastUpdated}</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" onClick={() => deletePlaylist(playlist.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
    )
}