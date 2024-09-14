import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFile) => {
  try {
    if (!localFile) return null;
    const response = await cloudinary.uploader.upload(localFile, {
      folder: "dealsDray",
      allowed_formats: ["jpg", "png"],
      chunk_size: 6000000,
      resource_type: "image",
    });
    console.log("file uploaded successfully", response.url);
    return response.url;
  } catch (error) {
    fs.unlinkSync(localFile); //Remove the locally saved file if upload fails
    return null;
  }
};

export default uploadOnCloudinary;
