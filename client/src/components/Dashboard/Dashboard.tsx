import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Switch } from "../ui/switch";
import {
  Users,
  Eye,
  ThumbsUp,
  Video,
  Search,
  Trash2,
  Pencil,
} from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Link } from "react-router-dom";

import { timeAgo } from "../../lib/timeAgo";
import DeletePopup from "./DeletePopup";
import UpdateVideoDetails from "./UpdateVideoDetails";
import DeletePlaylist from "./DeletePlaylist";
import UpdatePlaylist from "./UpdatePlaylist";
import { useToggleVideoPublish } from "../../hooks/video.hook";
import { useGetYourPlaylist } from "../../hooks/playlist.hook";
import {
  useGetChannelStats,
  useGetChannelVideos,
} from "../../hooks/dashboard.hook";

export default function ChannelDashboard() {
  const { data: channelStats, isLoading: channelStatsLoading } =
    useGetChannelStats();
  const { data: channelVideos, isLoading: channelVideosLoading } =
    useGetChannelVideos();

  const { mutateAsync: togglePublish } = useToggleVideoPublish();

  const { data: yourPlaylists, isLoading: getYourPlaylistsLoading } =
    useGetYourPlaylist();

  //console.log(channelStats);
  console.log(yourPlaylists);

  const togglePublishHandler = async (id: string) => {
    await togglePublish(id);
    //console.log("Toggling publish for video with id:",id);
  };

  if (channelStatsLoading || channelVideosLoading || getYourPlaylistsLoading)
    return <div>Loading...</div>;

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
            <div className="text-xl sm:text-2xl font-bold">
              {channelStats.totalSubscribers}
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              {channelStats.totalViews}
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              {channelStats.totalLikes}
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Videos</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              {channelStats.totalVideos}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="videos" className="space-y-4">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="videos" className="flex-1 sm:flex-none">
            Videos
          </TabsTrigger>
          <TabsTrigger value="playlists" className="flex-1 sm:flex-none">
            Playlists
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl sm:text-2xl font-bold">Your Videos</h2>
            <Link to="/upload">
              <Button>Upload New Video</Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="w-full sm:w-72">
              <Input
                type="text"
                placeholder="Search videos"
                className="w-full"
              />
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
                    <TableHead className="hidden sm:table-cell">
                      Views
                    </TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Likes
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Publish Date
                    </TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead>Edit</TableHead>
                    <TableHead>Delete</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {channelVideos.map((video: any) => (
                    <TableRow key={video._id}>
                      <TableCell className="font-medium">
                        <Link to={`/watch/${video._id}`}>{video.title}</Link>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {video.views}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {video.likesCount}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {timeAgo(video.createdAt)}
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={video.isPublished}
                          onCheckedChange={() =>
                            togglePublishHandler(video._id)
                          }
                        />
                      </TableCell>

                      <TableCell>
                        <UpdateVideoDetails formData={video}>
                          <Button variant="outline" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </UpdateVideoDetails>
                      </TableCell>
                      <TableCell>
                        <DeletePopup videoId={video._id}>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DeletePopup>
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
            <Link to="/playlist">
              <Button> See All Playlists</Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="w-full sm:w-72">
              <Input
                type="text"
                placeholder="Search playlists"
                className="w-full"
              />
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
                    <TableHead className="min-w-[150px]">Title</TableHead>
                    <TableHead>Videos</TableHead>
                    <TableHead>Total Duration</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Last Updated
                    </TableHead>
                    <TableHead>Edit</TableHead>
                    <TableHead>Delete</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {yourPlaylists.map((playlist: any) => (
                    <TableRow key={playlist._id}>
                      <TableCell className="font-medium">
                        <Link to={`/playlist/${playlist._id}`}>
                          {playlist.name}
                        </Link>
                      </TableCell>
                      <TableCell>{playlist.totalVideos}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {playlist.totalDuration}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {timeAgo(playlist.updatedAt)}
                      </TableCell>
                      <TableCell>
                        <UpdatePlaylist playlistDetails={playlist}>
                          <Button variant="outline" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </UpdatePlaylist>
                      </TableCell>
                      <TableCell>
                        <DeletePlaylist playlistId={playlist._id}>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DeletePlaylist>
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
  );
}
