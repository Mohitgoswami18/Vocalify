import { v2 as cloudinary } from "cloudinary";
import fs from "node:fs";
import dotenv from "dotenv";

dotenv.config(
  {path: "./.env"}
);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadToCloudinary = async (filePath) => {
  try {
    const responseString = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    console.log("File uploaded successfully:", responseString);
    return responseString;
  } catch (error) {
    console.error("Error uploading image to cloudinary:", error);
  }
};

export default uploadToCloudinary;
