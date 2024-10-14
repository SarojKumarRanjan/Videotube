import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ThumbsUp } from "lucide-react";

interface Comment {
  id: number;
  user: string;
  avatar: string;
  content: string;
  likes: number;
  timestamp: string;
}

const comments: Comment[] = [
  {
    id: 1,
    user: "Alice Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
    content: "This video is amazing! I learned so much.",
    likes: 15,
    timestamp: "2 days ago",
  },
  {
    id: 2,
    user: "Bob Smith",
    avatar: "/placeholder.svg?height=32&width=32",
    content: "Great content as always. Keep it up!",
    likes: 8,
    timestamp: "1 day ago",
  },
  // Add more comments as needed
];

export default function Comment() {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Comments</h3>
        <Select defaultValue="top">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort comments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="top">Top comments</SelectItem>
            <SelectItem value="newest">Newest first</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-4 mb-6">
        <Avatar>
          <AvatarImage
            src="/placeholder.svg?height=40&width=40"
            alt="Your Avatar"
          />
          <AvatarFallback>YA</AvatarFallback>
        </Avatar>
        <Input placeholder="Add a comment..." className="flex-grow" />
      </div>
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-4 mb-4">
          <Avatar>
            <AvatarImage src={comment.avatar} alt={comment.user} />
            <AvatarFallback>{comment.user[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">
              {comment.user}{" "}
              <span className="font-normal text-sm text-gray-500">
                {comment.timestamp}
              </span>
            </p>
            <p>{comment.content}</p>
            <div className="flex items-center gap-2 mt-2">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
              >
                <ThumbsUp className="h-4 w-4" />
                {comment.likes}
              </Button>
              <Button variant="ghost" size="sm">
                Reply
              </Button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
