import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import {ApiError} from "./utils/errorHandler.js"
import { LIMIT_DATA } from "./constants.js";

const app = express();

app.use(cors({
  origin: "https://video.sarojranjan.me", 
  credentials: true,                     
}));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://video.sarojranjan.me");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(express.json({ limit: LIMIT_DATA }));

app.use(express.urlencoded({ extended: true, limit: LIMIT_DATA }));

app.use(express.static("public"));

app.use(cookieparser());


app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

const errorHandler = (err,req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  } else {
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  }
};

//routes import 

import userRouter from "./routes/user.route.js"
import videoRouter from "./routes/video.route.js"
import subscriptionRouter from "./routes/subscription.route.js"
import likeRouter from "./routes/like.route.js"
import commentRouter from "./routes/comment.route.js"
import tweetRouter from "./routes/tweet.route.js"
import playlistRouter from "./routes/playlist.route.js"
import dashboardRouter from "./routes/dashboard.route.js"




//routes declaration  

app.use("/api/v1/users",userRouter)
app.use("/api/v1/video",videoRouter)
app.use("/api/v1/subscription",subscriptionRouter)
app.use("/api/v1/like",likeRouter)
app.use("/api/v1/comment",commentRouter)
app.use("/api/v1/tweet",tweetRouter)
app.use("/api/v1/playlist",playlistRouter)
app.use("/api/v1/dashboard",dashboardRouter)



app.use(errorHandler);

export { app };
