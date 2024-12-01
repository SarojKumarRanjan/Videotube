import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../ui/dialog"
  import { useUpdatePlaylistDetails } from "../../hooks/playlist.hook";
  import { toast } from "react-hot-toast";
  import { useState } from "react";
  import { Label } from "../ui/label";
  import { Input } from "../ui/input";
  import { Button } from "../ui/button";


interface PlaylistDetails {
    name?:string;
    description?:string;
    _id:string;
}

function UpdatePlaylist({children,playlistDetails}:{children:React.ReactNode,playlistDetails:PlaylistDetails}) {
    const [name,setName] = useState(playlistDetails.name || "");
    const [description,setDescription] = useState(playlistDetails.description || "");
    const [open, setOpen] = useState(false);
    const {mutateAsync:updatePlaylistDetails} = useUpdatePlaylistDetails();

    const handleUpdatePlaylistDetails = async () => {
        const response = await updatePlaylistDetails({playlistId:playlistDetails._id,playlistData:{name,description}});
        if(response.success){
            toast.success(response.message);
            setOpen(false);
        }else{
            toast.error(response.message);
        }
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Update Playlist</DialogTitle>
                <DialogDescription>Update the details of the playlist</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
          <div>
            <Label htmlFor="name">Playlist Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter playlist name"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter playlist description"
            />
                </div>
            </div>

            <DialogFooter>
                <Button onClick={handleUpdatePlaylistDetails} disabled={!name || !description}>Update</Button>
            </DialogFooter>

        </DialogContent>
        
    </Dialog>
  )
}

export default UpdatePlaylist