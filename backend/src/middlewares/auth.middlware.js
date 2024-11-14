import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken"
import {User} from "../models/user.model.js"


export const verifyJWT = asyncHandler(async(req,_,next) => {
  try {

    if (req.query?.guest === "true") {
      req.user = null; 
      return next();
    }
    const token =   req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    
    if (!token) {
      throw new ApiError(401,"Unauthorized request")
    }


  
    const decodedInfo =  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
  
    const user =  await User.findById(decodedInfo._id).select(["-password","-refreshToken"])
  
    if (!user) {
     throw new ApiError(401,"Invalid Access Token")
    }
  
    req.user = user
  
    next()
  } catch (error) {
    throw new ApiError(401,error.message)
  }
});