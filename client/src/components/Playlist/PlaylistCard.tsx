import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { PlayCircle,  MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../ui/dropdown-menu";
import { useState } from "react";
import EditPlaylistModal from "./EditPlaylistModal";
import { useDeletePlaylist,useUpdatePlaylistDetails } from "../../hooks/playlist.hook";
import toast from "react-hot-toast";
import formatVideoDuration from "../../lib/durationFormat";

interface PlaylistCardProps {
  coverImage: string;
  title: string;
  _id: string;
  videoCount: number;
  totalViews: number;
  description: string;
  totalDuration: number;
}

export default function PlaylistCard({
  coverImage,
  title,
  _id,
  videoCount,
  description,
  totalDuration,
  totalViews
}: PlaylistCardProps) {

const {mutateAsync:deletePlaylist} = useDeletePlaylist();

const {mutateAsync:updatePlaylistDetails} = useUpdatePlaylistDetails();

  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async() => {
  const res =  await deletePlaylist(_id);
 // console.log(res);
  
  if(res){
    toast.success("Playlist Deleted")
  }
}

  return (
    <div className="w-full max-w-[570px]">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-video group">
            <img
              src={coverImage}
              alt={`${title} playlist cover`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-between p-4">
              
              <div className="flex flex-col items-center justify-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link to={`${_id}`}>
                  <Button variant="secondary" className="flex items-center">
                    <PlayCircle className="mr-2 h-5 w-5" />
                    Play all
                  </Button>
                </Link>
              </div>
              <div className="self-end">
                <div className="p-1 absolute bottom-2 right-2 bg-black text-white text-xs px-1 rounded">
                  {videoCount} Videos
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-md">{title}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button>
                <MoreVertical className="h-5 w-5 cursor-pointer" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleEdit}>
                Edit Playlist Metadata
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>
                Delete Playlist
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span>{totalViews} views</span>
          
          <span className="mx-1">•</span>
          <span>Duration: {formatVideoDuration(totalDuration)}</span>
        </div>
        <Link to={`${_id}`}>
          <div className="text-sm text-gray-500">View full playlist</div>
        </Link>
      </div>

      {/* Edit Metadata Modal */}
      {isModalOpen && (
        <EditPlaylistModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          initialName={title}
          initialDescription={description}
          onUpdate={(updatedName, updatedDescription) => {
            const playlistDetails = {
              name: updatedName,
              description: updatedDescription,
            }
            updatePlaylistDetails({playlistId:_id,playlistData:playlistDetails});
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
