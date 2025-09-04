import {Router} from "express"
import { registerUser,login, getProfile, logout } from "../controllers/auth.controllers.js"
import {verifyJWT} from "../middlewares/auth.middlewares.js"
const router=Router();


//unsecured routes
router.route("/register").post(registerUser);
router.route("/login").post(login)
//secure routes
router.route("/profile").get(verifyJWT,getProfile);
router.route("/logout").delete(verifyJWT,logout)
export default router;