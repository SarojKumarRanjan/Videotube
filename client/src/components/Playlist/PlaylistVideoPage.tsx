import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { useState } from "react";
import PlaylistVideoCard from "./PlaylistVideoCard";
import { PlayCircle, Pencil, Share2, Trash2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { ScrollArea } from "../ui/scroll-area";
import { useGetPlaylist, useDeletePlaylist, useUpdatePlaylistDetails } from "../../hooks/playlist.hook";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import EditPlaylistModal from "./EditPlaylistModal";
import formatVideoDuration from "../../lib/durationFormat";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface Video {
  _id: string;
  videoFile: string;
  title: string;
  description: string;
  views: string;
  createdAt: string;
  duration: string;
  thumbnail: string;
  ownerName: string;
}

function PlaylistVideoPage() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const { playlistId } = useParams<{playlistId: string}>();
  const { mutateAsync: deletePlaylist } = useDeletePlaylist();
  const navigate = useNavigate();

  const { data, error, isError, isLoading } = useGetPlaylist(playlistId as string);
  const { mutateAsync: updatePlaylistDetails } = useUpdatePlaylistDetails();

  const filteredVideos = data?.videos.filter((video: Video) => 
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isError) {
    return <div>{error?.message}</div>;
  }

  if (isLoading) {
    return <div>loading....</div>;
  }

  const handleDelete = async() => {
    const res = await deletePlaylist(playlistId as string);
    
    if(res) {
      toast.success(res.message || "Playlist Deleted");
      navigate("/playlist");
    }
  };

  const handleEdit = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

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
                  Duration {formatVideoDuration(data?.totalDuration)} • {data?.totalVideos} videos • {data?.totalViews} views
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button className="flex-1">
                    <PlayCircle className="mr-2 h-4 w-4" /> 
                    <Link to={`/watch/${data?.videos[0]?._id}`}>
                      Play all
                    </Link>
                  </Button>
                  <Button onClick={handleEdit} variant="outline" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => setShowDeleteDialog(true)} variant="outline" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:w-2/3">
          <div className="flex justify-start items-center mb-4">
            <Input
              className="max-w-sm"
              placeholder="Search videos by title or description..."
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <ScrollArea className="h-[calc(100vh-178px)]">
            {filteredVideos?.map((video: Video) => (
              <PlaylistVideoCard 
                key={video._id} 
                playlistVideo={video} 
                playlistId={playlistId as string} 
              />
            ))}
            {filteredVideos?.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No videos found matching "{searchQuery}"
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
      {modalIsOpen && (
        <EditPlaylistModal
          isOpen={modalIsOpen}
          onClose={handleCloseModal}
          initialName={data.name}
          initialDescription={data.description}
          onUpdate={async(updatedName, updatedDescription) => {
            const playlistDetails = {
              name: updatedName,
              description: updatedDescription,
            };
            const res = await updatePlaylistDetails({
              playlistId: data?._id,
              playlistData: playlistDetails
            });
            toast.success(res.message || "playlist updated successfully");
            setModalIsOpen(false);
          }}
        />
      )}

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this playlist?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your playlist
              "{data?.name}" and remove it from your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              Delete Playlist
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default PlaylistVideoPage;