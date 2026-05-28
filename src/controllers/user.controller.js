import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation of user details like whether some details are missing or not
    // check if user already exists or not using the email id
    // check if files are there or not and upload the files to cloudinary and get the url of the uploaded files
    // if file uploaded than upload it to cloudnairy and get the url of the uploaded file and save it in the database
    // remove password from the user details before sending the response to the frontend
    
})

export { registerUser }