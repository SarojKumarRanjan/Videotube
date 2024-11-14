import fs from "fs";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const cloudinaryHandler = async (localFilePath, resource_type="image") => {
  console.log("video local file path", localFilePath);
 // console.log("cloud name", process.env.CLOUD_NAME);
 // console.log("api key", process.env.API_KEY);
 // console.log("api secret", process.env.API_SECRET);
  
  try {
    if (!localFilePath) return null;

    //upload to cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: resource_type,
      timeout: 60000,
    });
    console.log("response log",response);

    // Delete file AFTER successful upload
    try {
      fs.unlinkSync(localFilePath);
    } catch (unlinkError) {
      console.error("Error deleting file in try block :", unlinkError);
      // Continue execution even if file deletion fails
    }

    return response;
  } catch (uploadError) {
    console.error("Upload failed:", uploadError);
    // Try to delete file after failed upload
    try {
      fs.unlinkSync(localFilePath);
    } catch (unlinkError) {
      console.error("Error deleting file in catch block :", unlinkError);
    }
    return null;
  }
};
function extractPublicId(url) {
  // Split the URL by '/'
  const parts = url.split('/');
  
  // Get the last part (filename with extension)
  const filename = parts[parts.length - 1];
  
  // Split the filename by '.' and get the first part
  const publicId = filename.split('.')[0];
  
  return publicId;
}



const deleteOnCloudinary = async(url,resource_type="image") => {
  const publicId = extractPublicId(url)
  try {
    const response = await cloudinary.uploader.destroy(publicId,{resource_type})
    if(response) {
      return response;
    }
  } catch (error) {
    return null;
  }
}

export { cloudinaryHandler,deleteOnCloudinary };
