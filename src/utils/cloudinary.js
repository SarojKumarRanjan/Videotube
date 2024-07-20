import fs from "fs";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const cloudinaryHandler = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    //upload to cloudinary

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    })
    if (response) {
      fs.unlinkSync(localFilePath);
    }

    //file uploaded successfully
    //console.log("file uploaded successfully", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remvove the file from local storage as the file upload failed
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
