import * as React from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Channel {
  id: string;
  name: string;
  avatar: string;
}

const subscribedChannels: Channel[] = [
  { id: "1", name: "Tech Talk", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "2", name: "Cooking Master", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "3", name: "Travel Diaries", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "4", name: "Fitness First", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "5", name: "Music Mania", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "6", name: "Science Explained", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "7", name: "Art & Craft", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "8", name: "Gaming Zone", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "9", name: "Tech Talk", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "1", name: "Tech Talk", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "2", name: "Cooking Master", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "3", name: "Travel Diaries", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "4", name: "Fitness First", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "5", name: "Music Mania", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "6", name: "Science Explained", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "7", name: "Art & Craft", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "8", name: "Gaming Zone", avatar: "/placeholder.svg?height=32&width=32" },
  { id: "9", name: "Tech Talk", avatar: "/placeholder.svg?height=32&width=32" },
];

export default function SubscriptionPage() {
  

  return (
    <div className=" mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Subscriptions</h1>



      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {
            subscribedChannels.map((channel) => (
                <div key={channel.id} className=" flex flex-col items-center space-y-2 min-w-[100px]">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={channel.avatar} alt={channel.name} />
                    <AvatarFallback>{channel.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-center">{channel.name}</span>
                </div>
              ))
        }
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>

      
      {/*  <ScrollArea className="whitespace-nowrap rounded-md border">
        <div className="flex">
            {subscribedChannels.map((channel) => (
              <div key={channel.id} className=" flex flex-col items-center space-y-2 min-w-[100px]">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={channel.avatar} alt={channel.name} />
                  <AvatarFallback>{channel.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-center">{channel.name}</span>
              </div>
            ))}
            </div>

            <ScrollBar orientation="horizontal" />

</ScrollArea> */}
         
         
      
    </div>
  );
}
