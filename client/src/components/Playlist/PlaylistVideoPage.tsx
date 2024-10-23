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



const playlistVideos  = [
  {
    id: "1",
    title: "Web Scraping Full Course 2024 | Build and Deploy eCommerce Price Tracker",
    channel: "JavaScript Mastery",
    views: "348K views",
    uploadTime: "1 year ago",
    duration: "4:01:41",
    thumbnail:
      "https://images.pexels.com/photos/12909900/pexels-photo-12909900.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    id: "2",
    title: "Not Enjoying Development?",
    channel: "Striver",
    views: "51K views",
    uploadTime: "7 months ago",
    duration: "10:44",
    thumbnail:
      "https://images.pexels.com/photos/372098/pexels-photo-372098.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    id: "3",
    title: "Building Nextjs14 Website: Shadcn, Framer Motion, Tailwind & Typescript",
    channel: "NewAwesomeTech",
    views: "2.3K views",
    uploadTime: "7 months ago",
    duration: "3:02:42",
    thumbnail:
      "https://images.pexels.com/photos/372098/pexels-photo-372098.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    id: "4",
    title: "Build & Deploy Full Stack E-Commerce Website + Admin Dashboard | Next.js, Stripe, Tailwind, MongoDB",
    channel: "Code With Phuc",
    views: "108K views",
    uploadTime: "7 months ago",
    duration: "10:20:31",
    thumbnail:
      "https://images.pexels.com/photos/361104/pexels-photo-361104.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    id: "1",
    title: "Web Scraping Full Course 2024 | Build and Deploy eCommerce Price Tracker",
    channel: "JavaScript Mastery",
    views: "348K views",
    uploadTime: "1 year ago",
    duration: "4:01:41",
    thumbnail:
      "https://images.pexels.com/photos/12909900/pexels-photo-12909900.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    id: "2",
    title: "Not Enjoying Development?",
    channel: "Striver",
    views: "51K views",
    uploadTime: "7 months ago",
    duration: "10:44",
    thumbnail:
      "https://images.pexels.com/photos/372098/pexels-photo-372098.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    id: "3",
    title: "Building Nextjs14 Website: Shadcn, Framer Motion, Tailwind & Typescript",
    channel: "NewAwesomeTech",
    views: "2.3K views",
    uploadTime: "7 months ago",
    duration: "3:02:42",
    thumbnail:
      "https://images.pexels.com/photos/372098/pexels-photo-372098.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
  {
    id: "4",
    title: "Build & Deploy Full Stack E-Commerce Website + Admin Dashboard | Next.js, Stripe, Tailwind, MongoDB",
    channel: "Code With Phuc",
    views: "108K views",
    uploadTime: "7 months ago",
    duration: "10:20:31",
    thumbnail:
      "https://images.pexels.com/photos/361104/pexels-photo-361104.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  },
];

function PlaylistVideoPage() {
    const { playlistId } = useParams();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <Card>
            <CardContent className="p-0">
              <img
                src="https://images.pexels.com/photos/14177806/pexels-photo-14177806.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt="Playlist thumbnail"
                className="w-full h-48 object-cover rounded-md"
              />
              <div className="p-4">
                <h1 className="text-2xl font-bold mb-2">{playlistId}</h1>
                <p className="text-sm text-gray-500 mb-2">by Saroj Ranjan</p>
                <p className="text-sm text-gray-500 mb-4">
                  Private • 12 videos • 3 views
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
              placeholder="Find in playlist"
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
         
          {playlistVideos.map((video) => (
            <PlaylistVideoCard key={video.id} playlistVideo={video} />
          ))}
         
        </div>
      </div>
    </div>
  );
}

export default PlaylistVideoPage;
