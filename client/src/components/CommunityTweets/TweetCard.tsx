import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Input } from "../ui/input"
import { ThumbsUp, MessageSquare, MoreVertical } from "lucide-react"

interface Comment {
  id: number
  user: string
  avatar: string
  content: string
  likes: number
  timestamp: string
}

interface CommunityPostProps {
  author: string
  authorAvatar: string
  timestamp: string
  content: string
  image?: string
  likes: number
  comments: Comment[]
}

export default function TweetCard({
  author,
  authorAvatar,
  content,
  image,
  likes,
  comments,
  timestamp,
}: CommunityPostProps) {
  const [showAllComments, setShowAllComments] = React.useState(false)
  const [newComment, setNewComment] = React.useState("")

  const handleNewComment = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("New comment:", newComment)
    setNewComment("")
  }

  return (
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
          <Button variant="ghost" size="icon" className="ml-auto">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{content}</p>
        {image && (
          <img src={image} alt="Post content" className="w-full rounded-lg mb-4" />
        )}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="flex items-center space-x-2">
            <ThumbsUp className="h-4 w-4" />
            <span>{likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>{comments.length}</span>
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <form onSubmit={handleNewComment} className="w-full mb-4">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Your Avatar" />
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
                <p className="font-semibold">{comment.user} <span className="font-normal text-sm text-muted-foreground">{comment.timestamp}</span></p>
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
            {showAllComments ? "Show fewer comments" : `View all ${comments.length} comments`}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}