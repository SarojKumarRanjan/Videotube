import {
     getChannelStats,
     getChannelVideos,
    getChannelAbouts
    } from "../controllers/dashboard.controller.js"
import { verifyJWT } from './../middlewares/auth.middlware.js';
import { Router } from 'express';

const router = Router();

router.route('/getchannelstat').get(verifyJWT,getChannelStats);

router.route('/getchannelvideos').get(verifyJWT, getChannelVideos);

router.route('/getchannelabouts').get(verifyJWT, getChannelAbouts);

export default router;
