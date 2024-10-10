import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const dbconnect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MOGODB_URL}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected MONGODB CONNECTION RESPOSE:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("error in connecting in database", error);
    process.exit(1);
  }
};

export default dbconnect;
