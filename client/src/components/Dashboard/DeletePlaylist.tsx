import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../ui/dialog"
  import { useDeletePlaylist } from "../../hooks/playlist.hook";
  import { toast } from "react-hot-toast";

function DeletePlaylist({children,playlistId}:{children:React.ReactNode,playlistId:string}) {
    const {mutateAsync:deletePlaylist} = useDeletePlaylist();

    const handleDeletePlaylist = async () => {
       const response = await deletePlaylist(playlistId);
       if(response.success){
        toast.success(response.message);
       }else{
        toast.error(response.message);
       }
    }
  return (
    <Dialog>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you sure you want to delete this playlist?</DialogTitle>
                <DialogDescription>This action cannot be undone.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant="destructive" onClick={handleDeletePlaylist}>Delete</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default DeletePlaylist