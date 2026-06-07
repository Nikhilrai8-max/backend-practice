import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadToCloudinary = async (filePath, folder) => {
    try {        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto" , // we have used resource_type as auto because we want to upload all types of files to cloudinary and if we want to upload only images to cloudinary then we can use resource_type as image and if we want to upload only videos to cloudinary then we can use resource_type as video and if we want to upload only raw files to cloudinary then we can use resource_type as raw and if we want to upload only pdf files to cloudinary then we can use resource_type as pdf and if we want to upload only doc files to cloudinary then we can use resource_type as doc and if we want to upload only xls files to cloudinary then we can use resource_type as xls and if we want to upload only ppt files to cloudinary then we can use resource_type as ppt and if we want to upload only csv files to cloudinary then we can use resource_type as csv and if we want to upload only txt files to cloudinary then we can use resource_type as txt and if we want to upload only zip files to cloudinary then we can use resource_type as zip and if we want to upload only rar files to cloudinary then we can use resource_type as rar and if we want to upload only 7z files to cloudinary then we can use resource_type as 7z and if we want to upload only tar files to cloudinary then we can use resource_type as tar and if we want to upload only gz files to cloudinary then we can use resource_type as gz and if we want to upload only bz2 files to cloudinary then we can use resource_type as bz2 and if we want to upload only iso files to cloudinary then we can use resource_type as iso and if we want to upload only img files to cloudinary then we can use resource_type as img and if we want to upload only svg files to cloudinary then we can use resource_type as svg and if we want to upload only eps files to cloudinary then we can use resource_type as eps and if we want to upload only ai files to cloudinary then we can use resource_type as ai and if we want to upload only psd files to cloudinary then we can use resource_type as psd and if we want to upload only tiff files to cloudinary then we can use resource_type as tiff and if we want to upload only bmp files to cloudinary then we can use resource_type as bmp and if we want to upload only gif files to cloud
        });
        fs.unlinkSync(filePath);
        return result.secure_url;
    } catch (error) {
        fs.unlinkSync(filePath); 
        throw error;
    }
};
export { uploadToCloudinary };