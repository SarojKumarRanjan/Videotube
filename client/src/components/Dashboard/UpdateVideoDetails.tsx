import { useUpdateVideoDetails } from "../../hooks/video.hook";
import {toast} from "react-hot-toast";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../../components/ui/dialog"
import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

interface updateVideoDetails{
    title?:string;
    description?:string;
    thumbnail?:string;
    _id:string;
}

function UpdateVideoDetails({children, formData}: {children:React.ReactNode, formData:updateVideoDetails}) {
    const [updateFormData, setUpdateFormData] = useState(formData);
    const {mutateAsync:updateVideo} = useUpdateVideoDetails();

    const updateHandler = async(e: React.FormEvent) => {
        e.preventDefault();
        const res = await updateVideo({formData: updateFormData});
        if(res.success){
            toast.success(res.message);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Video Details</DialogTitle>
                    <DialogDescription>Update the details of the video</DialogDescription>
                </DialogHeader>
                <form onSubmit={updateHandler} className="space-y-2">
                    {updateFormData.thumbnail && (
                        <div className="mb-4">
                            <img 
                                src={updateFormData.thumbnail} 
                                alt="Video thumbnail" 
                                className="w-full h-40 object-cover rounded-lg"
                            />
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input 
                            type="text" 
                            placeholder="Title" 
                            value={updateFormData.title} 
                            onChange={(e) => setUpdateFormData({...updateFormData, title: e.target.value})} 
                        />
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                            placeholder="Description" 
                            value={updateFormData.description} 
                            onChange={(e) => setUpdateFormData({...updateFormData, description: e.target.value})}
                            rows={4}
                        />
                       
                    </div>
                    <DialogFooter>
                        <Button 
                            type="submit"
                            className=""
                        >
                            Update Video
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default UpdateVideoDetails