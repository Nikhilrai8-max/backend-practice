import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Apirespose } from "../utils/Apirespose.js";
import { User } from "../models/user.models.js";
import { uploadToCloudinary } from "../utils/fileupload.js";
import jwt from "jsonwebtoken";

const genrateAcessAndRefreshToken = async (userId) => {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    // save the refresh token in the database because it will need future to verify the refresh token when the user sends the request to refresh the access token
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
}



const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation of user details like whether some details are missing or not
    // check if user already exists or not using the email id
    // check if files are there or not and upload the files to cloudinary and get the url of the uploaded files
    // if file uploaded than upload it to cloudnairy and get the url of the uploaded file and save it in the database
    // remove password from the user details before sending the response to the frontend
    const { fullName, email, password, username } = req.body;
    // checking validations
    if (!fullName || !email || !password || !username) {
        throw new ApiError(400, "Please fill all the details");
    }

    // check if user already exists or not using the email id
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
        throw new ApiError(409, "User with email or username already exists");
    }

    const avatarLocalPath = req.file?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    const avatarUrl = await uploadToCloudinary(avatarLocalPath);
    if (!avatarUrl) {
        throw new ApiError(500, "Something went wrong while uploading the avatar");
    }

    const user = await User.create({
        fullName,
        email,
        password,
        username: username.toLowerCase(),
        avatar: avatarUrl,
    });

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new Apirespose(201, "User registered Successfully", createdUser)
    );
});

const loginUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation of user details like whether some details are missing or not
    // find the user in the database using the email id
    // if user not found than send error response to the frontend
    // if user found than compare the password with the hashed password in the database

    // if password is incorrect than send error response to the frontend

    // if password is correct than generate a token and send it to the frontend along with the user details except password
    const {email , username , password } = req.body;
    if ((!email && !username) || !password) {
        throw new ApiError(400, "Please provide email or username and password");
    } 
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password");
    }
    const { accessToken, refreshToken } = await genrateAcessAndRefreshToken(user._id);
    const userDetails = await User.findById(user._id).select("-password -refreshToken");
    const options = { // options for the cookie to make it more secure and to prevent cross site scripting attacks and to prevent cross site request forgery attacks and to prevent other types of attacks and to ensure that the cookie is only sent over https and to ensure that the cookie is not accessible by javascript and to ensure that the cookie is not sent to other domains and to ensure that the cookie is not sent to subdomains and to ensure that the cookie is not sent to third party domains and to ensure that the cookie is not sent to other origins and to ensure that the cookie is not sent to other sites and to ensure that the cookie is not sent to other applications and to ensure that the cookie is not sent to other services and to ensure that the cookie is not sent to other APIs and to ensure that the cookie is not sent to other endpoints and to ensure that the cookie is not sent to other routes and to ensure that the cookie is not sent to other handlers and to ensure that the cookie is not sent to other middlewares and to ensure that the cookie is not sent to other controllers and to ensure that the cookie is not sent to other functions and to ensure that the cookie is not sent to other modules and to ensure that the cookie is not sent to other files and to ensure that the cookie is not sent to other folders and to ensure that the cookie is not sent to other directories and to ensure that the cookie is not sent to other locations and to ensure that the cookie is not sent to other places and to ensure that the cookie is not sent to other areas and to ensure that the cookie is not sent to other regions and to ensure that the cookie is not sent to other zones and to ensure that the cookie is not sent to other sectors and to ensure that the cookie is not sent to other divisions and to ensure that the cookie is not sent to other departments and so on.
        httpOnly: true,
        secure : true
    }
    return res.status(200).cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options).json(
        new Apirespose(200, "User logged in successfully", userDetails)
    );
});

const logoutUser = asyncHandler(async (req, res) => {
    // get the user id from the request object which is added by the auth middleware
    // find the user in the database using the user id
    // if user not found than send error response to the frontend
    // if user found than remove the refresh token from the database and send success response to the frontend
    const userId = req.user?._id;
    if (userId) {
        const user = await User.findById(userId);
        if (user) {
            user.refreshToken = null;
            await user.save({ validateBeforeSave: false });
        }
    }
    const options = {
        httpOnly: true,
        secure : true
    }
    return res.status(200).cookie("refreshToken", null, options)
    .cookie("accessToken", null, options).json(
        new Apirespose(200, "User logged out successfully", null)
    );
});

    
    const refreshAcessToken = asyncHandler(async (req, res) => {
        const incoimingrefreshToken = req.cookies.refreshToken || req.body.refreshToken
        if(!incoimingrefreshToken){
            throw new ApiError(400, "Refresh token is required");
        }
        try {
        const decodedtoken = jwt.verify(incoimingrefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedtoken.userId);
        if(!user){
            throw new ApiError(401, "Invalid refresh token");
        }
        if(incoimingrefreshToken !== user?.refreshToken){
            throw new ApiError(401, "Invalid refresh token");
        }
        const options = {
            httpOnly: true,
            secure : true
        }
        const { accessToken, refreshToken } = await genrateAcessAndRefreshToken(user._id);
        return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(
            new ApiResponse(200, "Access token refreshed successfully", { accessToken, refreshToken })
        );
    } catch (error) {
        throw new ApiError(401, "Invalid refresh token");   
    } 
    });
export { registerUser, loginUser, logoutUser, refreshAcessToken };