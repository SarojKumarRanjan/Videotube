import { verifyJWT } from './../middlewares/auth.middlware.js';
import { Router } from 'express';
import {
    toggleVIdeoLike,
    toggleCommentLike,
    toggleTweetLike,
    getLikedVideo,
} from "../controllers/like.controller.js"


const router = Router();

router.route('/video/:videoId').post(verifyJWT, toggleVIdeoLike)

router.route('/comment/:commentId').post(verifyJWT, toggleCommentLike)

router.route('/tweet/:tweetId').post(verifyJWT, toggleTweetLike)

router.route('/liked/video').get(verifyJWT, getLikedVideo)



export default router;