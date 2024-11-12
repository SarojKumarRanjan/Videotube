import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { ThumbsUp, MessageSquare, MoreVertical } from "lucide-react";
import { useTweetLike } from "../../hooks/like.hook";
import toast from "react-hot-toast";
import { useDeleteTweet,useUpdateTweet } from "../../hooks/tweet.hook";
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


interface Comment {
  id: number;
  user: string;
  avatar: string;
  content: string;
  likes: number;
  timestamp: string;
}

interface CommunityPostProps {
  author: string;
  authorAvatar: string;
  timestamp: string;
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  _id: string;
}

export default function TweetCard({
  author,
  authorAvatar,
  content,
  image,
  likes,
  comments,
  timestamp,
  _id,
}: CommunityPostProps) {
  const { mutateAsync: tweetLike } = useTweetLike();
  const { mutateAsync: tweetDelete } = useDeleteTweet();
  const { mutateAsync: tweetUpdate } = useUpdateTweet();

  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newContent, setNewContent] = useState(content);

  const handleNewComment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New comment:", newComment);
    setNewComment("");
  };

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
    
    setShowModal(false);
    const res = await tweetUpdate({tweetId:_id,content:newContent});
    console.log(res);
    if (res) {
     
      
      toast.success(res);
    }
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
                <AvatarImage src={authorAvatar} alt={author} />
                <AvatarFallback>{author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{author}</p>
                <p className="text-sm text-muted-foreground">{timestamp}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" size="icon" className="ml-auto">
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
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2"
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2"
            >
              <MessageSquare className="h-4 w-4" />
              <span>{comments.length}</span>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <form onSubmit={handleNewComment} className="w-full mb-4">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="Your Avatar"
                />
                <AvatarFallback>YA</AvatarFallback>
              </Avatar>
              <Input
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" size="sm">
                Post
              </Button>
            </div>
          </form>
          {comments.slice(0, showAllComments ? undefined : 3).map((comment) => (
            <div key={comment.id} className="w-full mb-4">
              <div className="flex items-start space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.avatar} alt={comment.user} />
                  <AvatarFallback>{comment.user[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <p className="font-semibold">
                    {comment.user}{" "}
                    <span className="font-normal text-sm text-muted-foreground">
                      {comment.timestamp}
                    </span>
                  </p>
                  <p>{comment.content}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Button variant="ghost" size="sm" className="h-auto p-0">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {comment.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-auto p-0">
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {comments.length > 3 && (
            <Button
              variant="link"
              onClick={() => setShowAllComments(!showAllComments)}
              className="mt-2"
            >
              {showAllComments
                ? "Show fewer comments"
                : `View all ${comments.length} comments`}
            </Button>
          )}
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
