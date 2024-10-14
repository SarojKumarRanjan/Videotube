import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ThumbsUp, Share2, MoreHorizontal } from "lucide-react";
import Comment from "../Comments/Comments";

export default function SingleVideo() {
  return (
    <div className="lg:w-8/12">
      <div className="aspect-video bg-gray-200 mb-4">
        {/* Video player container */}
        <div className="w-full h-full flex items-center justify-center text-2xl text-gray-500">
          Video Player
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-2">Amazing Video Title</h1>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-4">
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt="Channel Name"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">Channel Name</h2>
            <p className="text-sm text-gray-500">1M subscribers</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Subscribe</Button>
          <Button variant="outline" size="icon">
            <ThumbsUp className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="mb-4 text-sm text-gray-500">100K views • 1 week ago</div>
      <Accordion type="single" collapsible className="mb-8">
        <AccordionItem value="description">
          <AccordionTrigger>Description</AccordionTrigger>
          <AccordionContent>
            <p className="p-4">
              This is the video description. It can contain multiple lines of
              text describing the content of the video, providing additional
              context, or including links to related resources.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div>
       
        <Comment />
      </div>
    </div>
  );
}
