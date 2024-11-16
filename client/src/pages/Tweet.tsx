/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { useCreateTweet, useGetAllTweets } from "../hooks/tweet.hook";
import TweetCard from "../components/CommunityTweets/TweetCard";
import { timeAgo } from "../lib/timeAgo";

const sampleComments = [
  {
    id: 5,
    user: "Alice",
    avatar: "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: "Great post! Really enjoyed reading this.",
    likes: 15,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    user: "Bob",
    avatar: "https://images.pexels.com/photos/2176593/pexels-photo-2176593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: "I agree with Alice!",
    likes: 3,
    timestamp: "1 hour ago",
  },
  {
    id: 1,
    user: "Alice",
    avatar: "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: "Great post! Really enjoyed reading this.",
    likes: 15,
    timestamp: "2 hours ago",
  },
  {
    id: 9,
    user: "Bob",
    avatar: "https://images.pexels.com/photos/2176593/pexels-photo-2176593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: "I agree with Alice!",
    likes: 3,
    timestamp: "1 hour ago",
  },
  {
    id: 45,
    user: "Alice",
    avatar: "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: "Great post! Really enjoyed reading this.",
    likes: 15,
    timestamp: "2 hours ago",
  },
  {
    id: 63,
    user: "Bob",
    avatar: "https://images.pexels.com/photos/2176593/pexels-photo-2176593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: "I agree with Alice!",
    likes: 3,
    timestamp: "1 hour ago",
  },
  // Add more comments as needed
]



export default function Tweet() {
  const [tweetContent, setTweetContent] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tweetImage, setTweetImage] = useState<File | null>(null);

  //@ts-ignore
  const authStatus = useSelector((state) => state.auth.authStatus);
  const { data: tweets, isLoading, error, isError } = useGetAllTweets();
  const { mutateAsync: createTweet } = useCreateTweet();

  console.log(tweets);
  
  const addTweet = async () => {
  //@ts-ignore
    const res = await createTweet({ content: tweetContent, tweetImage });
    if (res) {
      toast.success(res.message);
      setTweetContent('');
      setIsDialogOpen(false);  
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error?.message}</div>;
  }

  return (
    <div className="m-3">
      <div className="flex justify-evenly  mt-6 my-3">
        <h1 className="text-2xl font-bold">Community Tweets</h1>
        {authStatus && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsDialogOpen(true)}>Create Tweet</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Tweet</DialogTitle>
                <DialogDescription>
                  Share your thoughts with the community
                </DialogDescription>
              </DialogHeader>
              
              <label className="block text-sm font-medium text-gray-700">
                Upload Image
              </label>
              <input
                onChange={(e) => setTweetImage(e.target.files?.[0] || null)}
                type="file"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <textarea
                value={tweetContent}
                onChange={(e) => setTweetContent(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="What's on your mind?"
              />
              <DialogFooter>
                <Button onClick={addTweet}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      {tweets?.map((tweet:any) => (
        <TweetCard
          key={tweet._id}
          author={tweet?.ownerDetails?.userName}
          authorAvatar={tweet?.ownerDetails?.avatar}
          timestamp={timeAgo(tweet.createdAt)}
          content={tweet.content}
          image={tweet.tweetImage}
          likes={tweet.likesCount}
          comments={sampleComments}
          _id={tweet._id}
          ownerId={tweet?.ownerDetails?._id}
          isLiked={tweet.isLiked}
        />
      ))}
    </div>
  );
}
