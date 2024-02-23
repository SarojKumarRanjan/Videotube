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

export { app };
