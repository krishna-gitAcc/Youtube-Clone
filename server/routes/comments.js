import express from "express";
import { test } from "../controllers/comments.js";
// import { CreateCustomeError } from "../Helper/error.js";
import { verifyToken } from "../middlewares/auth.js";
import {
  addComment,
  getComments,
  deleteComment,
} from "../controllers/comments.js";
const router = express.Router();

router.get("/test", test);

// Add a comment to video
router.post("/", verifyToken, addComment);

//Delete a comment of video
router.delete("/:id", verifyToken, deleteComment);

// Get all comment for a video
router.get("/:videoId", getComments);

export default router;
