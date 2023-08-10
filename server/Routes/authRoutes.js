import express from "express";
import { signin, signup } from "../Controllers/authControllers.js";
const router = express.Router();

// router.get("/test", test);
//create a user
router.post("/signup", signup);
//signin
router.post("/signin", signin);
//google auth
// router.post("/google");
export default router;
