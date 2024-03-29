import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addComment,
  deleteComment,
  getComments,
} from "../Controllers/commentControllers.js";

const router = express.Router();

router.post("/", verifyToken, addComment);
router.delete("/:commentId", verifyToken, deleteComment);
router.get("/:videoId", getComments);

export default router;
