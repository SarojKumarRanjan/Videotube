 import { useDeleteVideo } from "../../hooks/video.hook"
 import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../../components/ui/dialog"
  import { Button } from "../../components/ui/button"
  import {toast} from "react-hot-toast";
 function DeletePopup({videoId,children}:{videoId:string,children:React.ReactNode}) {

    const {mutateAsync:deleteVideo} = useDeleteVideo();

    const deleteHandler = async() => {
      const res = await deleteVideo(videoId);
      if(res.success){
        toast.success(res.message);
      }
    }
   return (
    <Dialog>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you sure you want to delete this video?</DialogTitle>
                <DialogDescription>This action cannot be undone.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant="destructive" onClick={deleteHandler}>Delete</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
   )
 }
 
 export default DeletePopup