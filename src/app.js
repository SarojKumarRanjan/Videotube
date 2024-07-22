import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";

import { LIMIT_DATA } from "./constants.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: LIMIT_DATA }));

app.use(express.urlencoded({ extended: true, limit: LIMIT_DATA }));

app.use(express.static("public"));

app.use(cookieparser());

//routes import 

import userRouter from "./routes/user.route.js"
import videoRouter from "./routes/video.route.js"
import subscriptionRouter from "./routes/subscription.route.js"
import likeRouter from "./routes/like.route.js"
import commentRouter from "./routes/comment.route.js"
import tweetRouter from "./routes/tweet.route.js"




//routes declaration  

app.use("/api/v1/users",userRouter)

app.use("/api/v1/video",videoRouter)

app.use("/api/v1/subscription",subscriptionRouter)

app.use("/api/v1/like",likeRouter)

app.use("/api/v1/comment",commentRouter)

app.use("/api/v1/tweet",tweetRouter)

export { app };
