import { Router } from 'express';
import { verifyJWT } from './../middlewares/auth.middlware.js';
import {
    addTweet,
    updateTweet,
    deleteTweet,
    getUserTweets,
    getAllTweets,
} from "../controllers/tweet.controller.js"

const router = Router();


router.route('/add-tweet').post(verifyJWT,addTweet);

router.route('/update-tweet/:tweetId').patch(verifyJWT, updateTweet);

router.route('/delete-tweet/:tweetId').delete(verifyJWT, deleteTweet);

router.route('/user-tweets/:userId').get(verifyJWT, getUserTweets);

router.route('/all-tweets').get(getAllTweets);

export default router;
