
import TweetCard from "../components/CommunityTweets/TweetCard"
import { useGetAllTweets } from "../hooks/tweet.hook"
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
    const { data: tweets, isLoading,error,isError } = useGetAllTweets();

    if(isLoading){
        return <div>Loading...</div>
    }
    if(isError){
        return <div>{error?.message}</div>
    }
   //console.log(tweets);
    return (
        <div className="m-3">
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            tweets?.map((tweet:any) => (
              <TweetCard
                key={tweet._id}
                author={tweet?.ownerDetails?.userName}
                authorAvatar={tweet?.ownerDetails?.avatar}
                timestamp={timeAgo(tweet.createdAt)}
                content={tweet.content}
                image={tweet.image}
                likes={tweet.likesCount}
                comments={sampleComments}
                _id={tweet._id}
              />
            ))
          }
       
    
        </div>
        
    )
}