import { verifyJWT } from './../middlewares/auth.middlware.js';
import { Router } from 'express';

import {
    createPlaylist,
    getPlaylistById,
    getUserPlaylists,
    addVideoToPlaylist,
    deleteVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist,
} from "../controllers/playlist.controller.js"

const router = Router();

router.route('/add').post(verifyJWT,createPlaylist)

router.route('/:playlistId').get(verifyJWT, getPlaylistById)

router.route('/user/:userId').get(verifyJWT, getUserPlaylists)

router.route('/:playlistId/video/:videoId').post(verifyJWT, addVideoToPlaylist)

router.route('/:playlistId/video/:videoId').delete(verifyJWT, deleteVideoFromPlaylist)

router.route('/delete/:playlistId').delete(verifyJWT, deletePlaylist)

router.route('/update/:playlistId').put(verifyJWT, updatePlaylist)

export default router;