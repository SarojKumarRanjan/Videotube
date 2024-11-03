import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import PlaylistVideoCard from "./PlaylistVideoCard";
import { PlayCircle, Plus, Pencil, Share2, MoreVertical } from "lucide-react";
import { useParams } from "react-router-dom";
import { ScrollArea } from "../ui/scroll-area";
import { useGetPlaylist } from "../../hooks/playlist.hook";



interface Video {
  _id: string;
  videoFile:string
  title: string;
  description: string;
  views: string;
  createdAt: string;
  duration: string;
  thumbnail: string;
  ownerName:string
}


function PlaylistVideoPage() {
    const { playlistId } = useParams<{playlistId:string}>();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
    const {data,error,isError,isLoading} = useGetPlaylist(playlistId)

    if(isError){
        return(
            <div>
                {error?.message}
            </div>
        )
    }

    if(isLoading){
        return(
            <div>
                loading....
            </div>
        )
    }

   // console.log(data);
    


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <Card>
            <CardContent className="p-0">
              <img
                src={data?.coverImage}
                alt="Playlist thumbnail"
                className="w-full h-48 object-cover rounded-md"
              />
              <div className="p-4">
                <h1 className="text-2xl font-bold mb-2">{data?.name}</h1>
                <p className="text-sm text-gray-500 mb-2">{data?.description}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Private • {data?.totalVideos} videos • {data?.totalViews} views
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button className="flex-1">
                    <PlayCircle className="mr-2 h-4 w-4" /> Play all
                  </Button>
                  <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:w-2/3">
          <div className="flex justify-between items-center mb-4">
            <Input
              className="max-w-sm"
              placeholder="Find in playlist feature coming soon...."
              type="search"
            />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-added-newest">
                  Date added (newest)
                </SelectItem>
                <SelectItem value="date-added-oldest">
                  Date added (oldest)
                </SelectItem>
                <SelectItem value="most-popular">Most popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ScrollArea className="h-[calc(100vh-178px)]">
         
          {data?.videos.map((video:Video) => (
            <PlaylistVideoCard key={video._id} playlistVideo={video} />
          ))}
            </ScrollArea>
         
        </div>
      </div>
    </div>
  );
}

export default PlaylistVideoPage;
