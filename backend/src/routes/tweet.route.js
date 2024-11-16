import { Router } from 'express';
import { verifyJWT } from './../middlewares/auth.middlware.js';
import {
    addTweet,
    updateTweet,
    deleteTweet,
    getUserTweets,
    getAllTweets,
} from "../controllers/tweet.controller.js"
import {upload} from '../middlewares/multer.middleware.js';

const router = Router();


router.route('/add-tweet').post(upload.single("tweetImage"),verifyJWT,addTweet);

router.route('/update-tweet/:tweetId').patch(upload.single("tweetImage"),verifyJWT, updateTweet);

router.route('/delete-tweet/:tweetId').delete(verifyJWT, deleteTweet);

router.route('/user-tweets/:userId').get(verifyJWT, getUserTweets);

router.route('/all-tweets').get(verifyJWT,getAllTweets);

export default router;
