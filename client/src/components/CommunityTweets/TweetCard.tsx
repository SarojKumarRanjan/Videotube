/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { ThumbsUp,  MoreVertical } from "lucide-react";
import { useTweetLike } from "../../hooks/like.hook";
import toast from "react-hot-toast";
import { useDeleteTweet,useUpdateTweet } from "../../hooks/tweet.hook";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuContent,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Link } from "react-router-dom";
//import TweetComment from "./TweetComment";



/* interface Comment {
  id: number;
  user: string;
  avatar: string;
  content: string;
  likes: number;
  timestamp: string;
} */

interface CommunityPostProps {
  author: string;
  authorAvatar: string;
  timestamp: string;
  content: string;
  image?: string;
  likes: number;
  //comments: Comment[];
  _id: string;
  ownerId: string;
  isLiked: boolean;
}

export default function TweetCard({
  author,
  authorAvatar,
  content,
  image,
  likes,
  
  timestamp,
  _id,
  ownerId,
  isLiked
}: CommunityPostProps) {

  //console.log(isLiked);
  

  //@ts-ignore
const userId = useSelector((state) => state?.auth?.user?._id);

  const { mutateAsync: tweetLike } = useTweetLike();
  const { mutateAsync: tweetDelete } = useDeleteTweet();
  const { mutateAsync: tweetUpdate } = useUpdateTweet();

 //console.log(ownerId!==userId);
 
  
  const [showModal, setShowModal] = useState(false);
  const [newContent, setNewContent] = useState(content);
  const [tweetImage,setTweetImage] = useState<File | null>(null);

 

  const commentLikeHandler = async () => {
    const res = await tweetLike(_id);
    if (res) {
      toast.success(res?.message);
    }
  };

  const handleModal = () => {
    if (!showModal) {
      setNewContent(content);
    }
    setShowModal(!showModal);
  };

  const handleUpdate = async() => {
    
    
    //@ts-ignore
    const res = await tweetUpdate({tweetId:_id,content:newContent,tweetImage});
    //console.log(res);
    if (res) {
     
      
      toast.success(res?.message);
    }
    setShowModal(false);
  };

  const handleDelete = async() => {
    const res = await tweetDelete(_id);
    console.log(res.message);
    
    if (res) {
      toast.success(res.message);
    }
  }

  


  return (
    <>
      <Card className="w-full max-w-2xl mx-auto my-6">
        <CardHeader>
          <div className="flex justify-between items-center space-x-4">
            <div className="flex gap-4 items-center">
              <Avatar>
                <Link to={`/channel/${ownerId}`}>
                <AvatarImage src={authorAvatar} alt={author} />
                <AvatarFallback>{author[0]}</AvatarFallback>
                </Link>
              </Avatar>
              <div>
                <p className="font-semibold">
                  <Link to={`/channel/${ownerId}`}>
                  {author}
                  </Link>
                  </p>
                <p className="text-sm text-muted-foreground">{timestamp}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button disabled={ownerId!==userId}  variant="ghost" size="icon" className="ml-auto">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={handleModal}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleDelete}> 
                    Delete
                    </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{content}</p>
          {image && (
            <img
              src={image}
              alt="Post content"
              className="w-full rounded-lg mb-4"
            />
          )}
          <div className="flex items-center space-x-4">
            <Button
              onClick={commentLikeHandler}
              variant={isLiked ? "default" : "ghost"}
              size="sm"
              className="flex items-center space-x-2"
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{likes}</span>
            </Button>
            {/* <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2"
            >
              <MessageSquare className="h-4 w-4" />
              <span>{comments.length}</span>
            </Button> */}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
       {/*  <TweetComment avatar={authorAvatar} comments={comments} /> */}
        </CardFooter>
      </Card>

      <Dialog open={showModal} onOpenChange={handleModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Community Post</DialogTitle>
            <DialogDescription>
              Update the content of the community post below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="content">Content</Label>
              <Input
                id="content"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Enter the new content"
              />
            </div>
            <div>
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                type="file"
                placeholder="Upload a new image"
                onChange={(e) => setTweetImage(e.target.files?.[0] || null)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleUpdate} disabled={!newContent}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
