
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import { useGetSubscribedChannels } from "../../hooks/subscription.hook";
import Loader from "../Loader";

type Channel  = {
  _id: string;
  fullName: string;
  avatar: string;
}

interface singleChannel{
  subscribedChannel:Channel;
}


export default function SubscriptionPage() {

  const { data: subscribedChannel,error,isError,isLoading } = useGetSubscribedChannels();
  
 //console.log(subscribedChannel[0]);
  
 if(isLoading) return <div>
    <Loader text="Loading subscriptions..." />
  </div>;
  
  if(!subscribedChannel || subscribedChannel.length === 0) return <div className="text-center mt-4">No Subscribed Channels Found</div>
  
  //console.log(subscribedChannel);
  
  
 
  if(isError) return <div>{error.message}</div>
  if(subscribedChannel.length === 0) return <div>No Subscribed Channels Found</div>

  return (
    <div className=" mx-auto px-6 py-4">
      <h1 className="text-2xl font-bold mb-6">Subscriptions</h1>



      <ScrollArea className="w-[272px] md:w-[500px] lg:w-[700px] xl:w-[1100px] 2xl:w-[1184px] whitespace-nowrap rounded-md border">
      <div className="flex  space-x-2 p-2">
        {
            subscribedChannel.map((channel:singleChannel) => (
                <Link to={`/channel/${channel?.subscribedChannel?._id}`}>
                <div key={channel?.subscribedChannel?._id} className=" flex flex-col items-center space-y-2 min-w-[100px]">
                   
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={channel?.subscribedChannel?.avatar} alt={channel?.subscribedChannel?.fullName} />
                    <AvatarFallback>{channel?.subscribedChannel?.fullName}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-center">{channel?.subscribedChannel?.fullName}</span>
                   
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
