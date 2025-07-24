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
import Loader from "../components/Loader";


export default function Tweet() {
  const [tweetContent, setTweetContent] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tweetImage, setTweetImage] = useState<File | null>(null);

  //@ts-ignore
  const authStatus = useSelector((state) => state.auth.authStatus);
  const { data: tweets, isLoading, error, isError } = useGetAllTweets();
  const { mutateAsync: createTweet } = useCreateTweet();

  
  
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
    return <div>
      <Loader text="Loading tweets..." />
    </div>;
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
          //comments={sampleComments}
          _id={tweet._id}
          ownerId={tweet?.ownerDetails?._id}
          isLiked={tweet.isLiked}
        />
      ))}
    </div>
  );
}
