/* require('dotenv').config({
    path:"./env"
}) */
import dotenv from "dotenv";
import dbconnect from "./db/dbconnect.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

dbconnect()
  .then(() => {
    app.on("error", (err) => {
      console.log(`error in db connection`, err);
      throw err;
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`SERVER RUNNING ON PORT ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`ERROR IN MONGODB CONNECTION`, error);
  });
