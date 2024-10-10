import{ Router } from 'express';
import {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels,
} from "../controllers/subscription.controller.js"
import { verifyJWT } from '../middlewares/auth.middlware.js';

const router = Router();

router.post('/subscribe/:channelId',verifyJWT, toggleSubscription);

router.get('/subscribers/:channelId',verifyJWT, getUserChannelSubscribers);

router.get('/subscribed/:subscriberId',verifyJWT, getSubscribedChannels);

export default router;