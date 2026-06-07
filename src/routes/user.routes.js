import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { loginUser , refreshAcessToken } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { logoutUser } from "../controllers/user.controller.js";


const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser)  // it is used to register a user by sending a post request to the url http://localhost:5000/api/v1/users/register with the request body containing the name, email and password of the user. it will return the name, email and password of the user in the response.
router.route("/login").post(loginUser)  // it is used to login a user by sending a post request to the url http://localhost:5000/api/v1/users/login with the request body containing the email and password of the user. it will return the name, email and password of the user in the response.

//secured routes
router.route("/logout").post(logoutUser)  // logout does not require a valid token; it clears cookies regardless
router.route("/refresh-token").post(refreshAcessToken)  // refresh token does not require a valid access token; it uses the refresh token from cookies or request body to issue new tokens  

export default router;