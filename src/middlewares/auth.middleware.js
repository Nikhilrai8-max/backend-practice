import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";    
import { User } from "../models/user.models.js";

export const verifyJWT = async (req, res, next) => {
    // get the token from the request header
    // if token is not present than send error response to the frontend
    // if token is present than verify the token using the secret key
    // if token is invalid than send error response to the frontend
    // if token is valid than get the user id from the token and add it to the request object and call the next middleware
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        throw new ApiError(401, "Unauthorized");
    }
    const decodedtoken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedtoken.userId).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(401, "Invalid token");
    }
    req.user = user;
    next();
};
export default verifyJWT;
