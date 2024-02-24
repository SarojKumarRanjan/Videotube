import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/errorHandler.js"
import { User } from './../models/user.model.js';
import {cloudinaryHandler} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/responseHandler.js"


const registerUser = asyncHandler(async (req,res) => {
 const {fullName,email,userName,password} = req.body
 
    if ([fullName,email,userName,password].some((field) =>field?.trim() === "" ))
     {
       throw new ApiError(400,"All fields are required")
    }

   const existedUser =  User.findOne({
        $or: [{email},{userName}]
    })

    if (existedUser) {
        throw new ApiError(409,"User already exists with same username or email")
    }

   const avatarLocalPath =  req.files?.avatar[0]?.path
   const coverImageLocalPath = req.files?.coverImage[0]?.path

   if (!avatarLocalPath) {
    throw new ApiError(400,"avatar is required")
   }

  const avatar =  await cloudinaryHandler(avatarLocalPath)
  const coverImage = await cloudinaryHandler(coverImageLocalPath)

  if (!avatar) {
    throw new ApiError(400,"avatar is required")
  }

  const user = await User.create({
    userName: userName.toLowerCase(),
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    password,
    email
  })

 const createdUser = await User.findById(user._id).select("-password -refreshToken")

 if (!createdUser) {
    throw new ApiError(500,"something went wrong while registering user")
 }


 return res.status(201).json(
    new ApiResponse(200,createdUser,"user registered successfully")
 )

})


export default registerUser;