import express from "express";
import { googleAuth, signin, signup } from "../Controllers/authControllers.js";
const router = express.Router();

// router.get("/test", test);
//create a user
router.post("/signup", signup);
//signin
router.post("/signin", signin);
//google auth
router.post("/google", googleAuth);
export default router;
