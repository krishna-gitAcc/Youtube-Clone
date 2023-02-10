import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  getUser,
  subscribeUser,
  unSubscribeUser,
  likeVideo,
  dislikeVideo,
} from "../controllers/user.js";
import { verifyToken } from "../middlewares/auth.js";
const router = express.Router();

router.get("/test", test);

//update user
router.put("/:id", verifyToken, updateUser);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//get a user
router.get("/find/:id", getUser);

//subscribe a user
router.put("/sub/:id", verifyToken, subscribeUser);

//unsubscribe a user
router.put("/unsub/:id", verifyToken, unSubscribeUser);

//like a video
router.put("/like/:videoId", verifyToken, likeVideo);

//dislike a video
router.put("/dislike/:videoId", verifyToken, dislikeVideo);

export default router;
