import express from "express";
import { test, signup, signin } from "../controllers/auth.js";
const router = express.Router();

router.get("/test", test);

//Create A user
router.post("/signup", signup);

// SignIn
router.post("/signin", signin);

//Google Authentication

export default router;
