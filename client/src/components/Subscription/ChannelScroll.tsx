
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";

interface Channel {
  id: string;
  name: string;
  avatar: string;
}

const subscribedChannels: Channel[] = [
  { id: "1", name: "Tech Talk", avatar: "https://images.pexels.com/photos/10144922/pexels-photo-10144922.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
  { id: "2", name: "Cooking Master", avatar: "https://images.pexels.com/photos/10144922/pexels-photo-10144922.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
  { id: "3", name: "Travel Diaries", avatar: "https://images.pexels.com/photos/10144922/pexels-photo-10144922.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
  { id: "4", name: "Fitness First", avatar: "https://images.pexels.com/photos/10144922/pexels-photo-10144922.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
  { id: "5", name: "Music Mania", avatar: "https://images.pexels.com/photos/10144922/pexels-photo-10144922.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
  { id: "6", name: "Science Explained", avatar: "https://images.pexels.com/photos/10144922/pexels-photo-10144922.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
  { id: "7", name: "Art & Craft", avatar: "https://images.pexels.com/photos/10144922/pexels-photo-10144922.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
  { id: "8", name: "Gaming Zone", avatar: "https://images.pexels.com/photos/10144922/pexels-photo-10144922.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
  { id: "9", name: "Tech Talk", avatar: "https://images.pexels.com/photos/10144922/pexels-photo-10144922.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
  { id: "1", name: "Tech Talk", avatar: "https://images.pexels.com/photos/10144922/pexels-photo-10144922.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
  { id: "2", name: "Cooking Master", avatar: "https://images.pexels.com/photos/10144922/pexels-photo-10144922.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
  { id: "3", name: "Travel Diaries", avatar: "https://images.pexels.com/photos/10144922/pexels-photo-10144922.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
  { id: "4", name: "Fitness First", avatar: "https://images.pexels.com/photos/10144922/pexels-photo-10144922.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
  { id: "5", name: "Music Mania", avatar: "https://images.pexels.com/photos/10144922/pexels-photo-10144922.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
  { id: "6", name: "Science Explained", avatar: "https://images.pexels.com/photos/10144922/pexels-photo-10144922.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
  { id: "7", name: "Art & Craft", avatar: "https://images.pexels.com/photos/10144922/pexels-photo-10144922.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
  { id: "8", name: "Gaming Zone", avatar: "https://images.pexels.com/photos/10144922/pexels-photo-10144922.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
  { id: "9", name: "Tech Talk", avatar: "https://images.pexels.com/photos/10144922/pexels-photo-10144922.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" },
];

export default function SubscriptionPage() {
  

  return (
    <div className=" mx-auto px-6 py-4">
      <h1 className="text-2xl font-bold mb-6">Subscriptions</h1>



      <ScrollArea className="w-[272px] md:w-[500px] lg:w-[700px] xl:w-[1100px] 2xl:w-[1184px] whitespace-nowrap rounded-md border">
      <div className="flex  space-x-2 p-2">
        {
            subscribedChannels.map((channel) => (
                <Link to={`/channel/${channel.id}`}>
                <div key={channel.id} className=" flex flex-col items-center space-y-2 min-w-[100px]">
                   
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={channel.avatar} alt={channel.name} />
                    <AvatarFallback>{channel.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-center">{channel.name}</span>
                   
                </div>
                 </Link>
              ))
        }
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>

      
      
         
         
      
    </div>
  );
}
