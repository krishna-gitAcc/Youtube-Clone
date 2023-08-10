import express from "express";
const router = express.Router();
import {
  deleteUser,
  disLikeVideo,
  getUser,
  likeVideo,
  subscribeUser,
  unSubscribeUser,
  updateUser,
} from "../Controllers/userControllers.js";
import { verifyToken } from "../middleware/verifyToken.js";

router.put("/:userId", verifyToken, updateUser);
router.delete("/:userId", verifyToken, deleteUser);
router.get("/find/:userId", getUser);
router.put("/sub/:userId", verifyToken, subscribeUser);
router.put("/unsub/:userId", verifyToken, unSubscribeUser);
router.put("/like/:videoId", verifyToken, likeVideo);
router.put("/dislike/:videoId", verifyToken, disLikeVideo);

export default router;
