// import { useState } from "react";
// import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { ThumbsUp } from "lucide-react";

// function TweetComment({comments,avatar}) {
//     const [showAllComments, setShowAllComments] = useState(false);
//     const [newComment, setNewComment] = useState("");



//     const handleNewComment = (e: React.FormEvent) => {
//         e.preventDefault();
//         console.log("New comment:", newComment);
//         setNewComment("");
//       };
//   return (
//     <div className="w-full"> <form onSubmit={handleNewComment} className="mb-4">
//     <div className="flex items-center space-x-2">
//       <Avatar className="h-8 w-8">
//         <AvatarImage
//           src={avatar}
//           alt="Your Avatar"
//         />
//         <AvatarFallback>YA</AvatarFallback>
//       </Avatar>
//       <Input
//         placeholder="Add a comment..."
//         value={newComment}
//         onChange={(e) => setNewComment(e.target.value)}
//         className="flex-grow"
//       />
//       <Button type="submit" size="sm">
//         Post
//       </Button>
//     </div>
//   </form>
//   {comments.slice(0, showAllComments ? undefined : 2).map((comment) => (
//     <div key={comment.id} className="w-full mb-4">
//       <div className="flex items-start space-x-2">
//         <Avatar className="h-8 w-8">
//           <AvatarImage src={comment.avatar} alt={comment.user} />
//           <AvatarFallback>{comment.user[0]}</AvatarFallback>
//         </Avatar>
//         <div className="flex-grow">
//           <p className="font-semibold">
//             {comment.user}{" "}
//             <span className="font-normal text-sm text-muted-foreground">
//               {comment.timestamp}
//             </span>
//           </p>
//           <p>{comment.content}</p>
//           <div className="flex items-center space-x-2 mt-1">
//             <Button variant="ghost" size="sm" className="h-auto p-0">
//               <ThumbsUp className="h-4 w-4 mr-1" />
//               {comment.likes}
//             </Button>
//             <Button variant="ghost" size="sm" className="h-auto p-0">
//               Reply
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   ))}
//   {comments.length > 2 && (
//     <Button
//       variant="link"
//       onClick={() => setShowAllComments(!showAllComments)}
//       className="mt-2"
//     >
//       {showAllComments
//         ? "Show fewer comments"
//         : `View more ${comments.length} comments`}
//     </Button>
//   )}</div>
//   )
// }

// export default TweetComment