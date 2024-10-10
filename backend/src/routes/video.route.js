import { verifyJWT } from "../middlewares/auth.middlware.js";
import { Router } from "express";
import {
  publishVideo,
  getAllVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishButton,
  updateWatchHistory,
} from "../controllers/video.controller.js";
import { upload } from "./../middlewares/multer.middleware.js";

const router = Router();

router.route("/publish-video").post(verifyJWT,upload.fields(
    [
        {
            name: "videoFile",
            maxCount: 1
        },
        {
            name: "thumbnail",
            maxCount: 1
        }
    ]
),publishVideo);

router.route("/get-all-videos").get( getAllVideo);

router.route("/get-video/:id").get(verifyJWT,getVideoById);

router.route("/update-video/:videoId").patch(verifyJWT,
    upload.fields(
        [
            {
                name: "videoFile",
                maxCount: 1
            },
            {
                name: "thumbnail",
                maxCount: 1
            }
        ]
    )
    , updateVideo);

router.route("/delete-video/:videoId").delete(verifyJWT, deleteVideo);

router.route("/toggle-publish/:videoId").patch(verifyJWT, togglePublishButton);

router.route("/update-watch-history/:videoId").post(verifyJWT, updateWatchHistory);



export default router;
