/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getVideoComments,addVideoComment,deleteCommentVideo,updateComment } from "../api/comment.api";
import { useInfiniteQuery,useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useVideoComments = (videoId: string) => {
    //@ts-ignore
    const guest = useSelector((state) => state?.auth?.authStatus);
    return useInfiniteQuery({
        queryKey: ['videoComments', videoId],
        queryFn: ({ pageParam = 1 }) => getVideoComments(videoId, pageParam, 10,!guest),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
           // console.log(lastPage);
            
            if (lastPage.data.hasNextPage) {
                return lastPage.data.nextPage || lastPage.data.page + 1;
            }
            return null; 
        },
        retry: 0,
        staleTime: 1000 * 60 * 5,
    });
};



export const useAddVideoComment = () => {
    
    return useMutation({
        //@ts-ignore
        mutationFn: (argument:argumentinterface) => {
           // console.log(argument);
            
            return addVideoComment(argument.videoId,argument.content);},
    })
}
interface argumentinterface {
    videoId:string;
    content:string

}
  
export const useDeleteVideoComment = () => {
    return useMutation({
        mutationFn: (commentId:string) => deleteCommentVideo(commentId),
    })
}

export const useUpdateComment = () => {
    return useMutation({
        mutationFn: (argument:{commentId:string,content:string}) => {
           //console.log(argument);
           
            return updateComment(argument.content,argument.commentId);}
    })
}