/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ThumbsUp, Trash2, Pencil, X, Check } from "lucide-react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useVideoComments, useAddVideoComment,useDeleteVideoComment,useUpdateComment } from "../../hooks/comment.hook";
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { toast } from "react-hot-toast";
import { useCommentLike } from "../../hooks/like.hook";
import { timeAgo } from "../../lib/timeAgo";

interface CommentResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    docs: Array<{
      _id: string;
      content: string;
      owner: {
        _id: string;
        fullName: string;
        avatar: string;
      };
      createdAt: string;
      likesCount: number;
      isLiked: boolean;
    }>;
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
  };
}

export default function Comment() {
  const { videoId } = useParams<{ videoId: string }>();
  const [content, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const { mutateAsync: addComment } = useAddVideoComment();
  const { mutateAsync: likeComment } = useCommentLike();
  const { mutateAsync: deleteComment } = useDeleteVideoComment();
  const { mutateAsync: updateComment } = useUpdateComment();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch
    //@ts-ignore
  } = useVideoComments(videoId);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  //@ts-ignore
  const user = useSelector((state) => state?.auth?.user);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  //@ts-ignore
 
  const avatar = user?.avatar;

  useEffect(() => {
    refetch();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , [user]);

  //@ts-ignore
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    setIsSubmitting(true);
    try {
      const argument = { videoId, content };
      //@ts-ignore
      const res = await addComment(argument);
      setNewComment("");
      await refetch();
      toast.success(res?.message || "Comment added successfully");
    } catch (error) {
      toast.error("Failed to add comment");
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    try {
      const res = await likeComment(commentId);
      toast.success(res?.message || "Comment liked successfully");
      await refetch();
    } catch (error) {
      toast.error("Failed to like comment");
      console.error("Error liking comment:", error);
    }
  };

  const handleEditComment = async (commentId: string) => {
    if (!editContent.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    try {
      
     const res =  await updateComment({ commentId, content: editContent });
      setEditingCommentId(null);
      setEditContent("");
      await refetch();
      toast.success(res?.message || "Comment updated successfully");
    } catch (error) {
      toast.error("Failed to update comment");
      console.error("Error updating comment:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      
    const res =   await deleteComment(commentId);
      await refetch();
      toast.success(res?.message || "Comment deleted successfully");
    } catch (error) {
      toast.error("Failed to delete comment");
      console.error("Error deleting comment:", error);
    }
  };

  //@ts-ignore
  const startEditing = (comment) => {
    //console.log(comment);
    
    setEditingCommentId(comment._id);
    setEditContent(comment.content);
  };

  

  return (
    <>
      <div className="flex justify-start items-center mb-4">
        <h3 className="text-xl font-bold">
          Comments {data?.pages[0]?.data?.totalDocs ? `(${data.pages[0].data.totalDocs})` : ''}
        </h3>
      </div>

      <form onSubmit={handleSubmitComment} className="flex items-center gap-4 mb-6">
        <Avatar>
          <AvatarImage src={avatar} alt={user?.fullName || 'User Avatar'} />
          <AvatarFallback>{user?.fullName?.[0] || 'U'}</AvatarFallback>
        </Avatar>
        <Input 
          placeholder="Add a comment..." 
          className="flex-grow"
          value={content}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={isSubmitting}
        />
        <Button 
          className="px-10" 
          type="submit" 
          size="sm"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Comment'}
        </Button>
      </form>

      <div className="space-y-4">
        {data?.pages.map((page: CommentResponse) =>
          page.data.docs.map((comment) => {



           // console.log(user?._id);
            //console.log(comment.owner._id);
            
            //console.log(user?._id === comment.owner._id);


            return(
            <div key={comment._id} className="flex gap-4 mb-4">
              <Avatar>
                <AvatarImage src={comment.owner.avatar} alt={comment.owner.fullName} />
                <AvatarFallback>{comment.owner.fullName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="font-semibold">
                    {comment.owner.fullName}{' '}
                    <span className="font-normal text-sm text-gray-500">
                      {timeAgo(comment.createdAt)}
                    </span>
                  </p>
                  {user?._id === comment.owner._id && (
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEditing(comment)}
                        className="h-8 w-8 p-0"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteComment(comment._id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                {editingCommentId === comment._id ? (
                  <div className="mt-2 flex gap-2">
                    <Input
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="flex-grow"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleEditComment(comment._id)}
                      className="h-8 w-8 p-0"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingCommentId(null)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <p className="mt-1">{comment.content}</p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant={comment.isLiked ? "default" : "ghost"}
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleLikeComment(comment._id)}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    {comment.likesCount}
                  </Button>
                </div>
              </div>
            </div>
          )})
        )}
      </div>

      {hasNextPage && (
        <div ref={ref} className="flex justify-center py-4">
          {isFetchingNextPage ? (
            <p className="text-gray-500">Loading more comments...</p>
          ) : (
            <p className="text-gray-500">Scroll for more comments</p>
          )}
        </div>
      )}
    </>
  );
}