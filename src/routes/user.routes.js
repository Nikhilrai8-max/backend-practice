import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser)  // it is used to register a user by sending a post request to the url http://localhost:5000/api/v1/users/register with the request body containing the name, email and password of the user. it will return the name, email and password of the user in the response.





export default router;