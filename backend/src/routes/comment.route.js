import { verifyJWT } from "../middlewares/auth.middlware.js";
import { Router } from "express";
import {addComment,updateComment,deleteComment,getVideoComments,getTweetComments} from "../controllers/comment.controller.js"

const router = Router();

router.route('/add-comment/:videoId').post(verifyJWT,addComment)

router.route('/update-comment/:commentId').patch(verifyJWT,updateComment)

router.route('/delete-comment/:commentId').delete(verifyJWT,deleteComment)

router.route('/get-video-comments/:videoId').get(verifyJWT,getVideoComments)

router.route('/get-tweet-comments/:tweetId').get(getTweetComments)


export default router;