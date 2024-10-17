
import TweetCard from "../components/CommunityTweets/TweetCard"


const sampleComments = [
    {
      id: 1,
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
    // Add more comments as needed
  ]


export default function Tweet() {
    return (
        <div className="m-3">
        <TweetCard
      author="Channel Name"
      authorAvatar="https://images.pexels.com/photos/709143/pexels-photo-709143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      timestamp="3 hours ago"
      content="Check out this amazing view from my recent trip!"
      image="https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      likes={1234}
      comments={sampleComments}
    />
     <TweetCard
      author="Channel Name"
      authorAvatar="https://images.pexels.com/photos/709143/pexels-photo-709143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      timestamp="3 hours ago"
      content="Check out this amazing view from my recent trip!"
      image="https://images.pexels.com/photos/2176593/pexels-photo-2176593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      likes={1234}
      comments={sampleComments}
    />
     <TweetCard
      author="Channel Name"
      authorAvatar="https://images.pexels.com/photos/709143/pexels-photo-709143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      timestamp="3 hours ago"
      content="Check out this amazing view from my recent trip!"
      image="https://images.pexels.com/photos/709143/pexels-photo-709143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      likes={1234}
      comments={sampleComments}
    />
        </div>
        
    )
}