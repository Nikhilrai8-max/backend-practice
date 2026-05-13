import { v2 as cloudnary} from "cloudinary";
import fs from "fs";
cloudnary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadToCloudinary = async (filePath, folder) => {
    try {        const result = await cloudnary.uploader.upload(filePath, {
            resource_type: "auto",
        });
        fs.unlinkSync(filePath);  // we have used unlinkSync method to delete the file from the local storage after uploading it to cloudinary because we don't want to keep the file in the local storage after uploading it to cloudinary and we have used unlinkSync method because it is a synchronous method and it will block the event loop until the file is deleted from the local storage and we want to ensure that the file is deleted from the local storage before we return the url of the uploaded file from cloudinary and if there is an error while deleting the file from the local storage then we will throw the error and we will not return the url of the uploaded file from cloudinary because if there is an error while deleting the file from the local storage then it means that there is some issue with the file and we don't want to return the url of the uploaded file from cloudinary if there is some issue with the file and we want to ensure that only valid files are uploaded to cloudinary and we want to ensure that only valid files are returned from cloudinary.
        return result.secure_url;
    } catch (error) {
        fs.unlinkSync(filePath);
        throw error;
    }
};
export { uploadToCloudinary };