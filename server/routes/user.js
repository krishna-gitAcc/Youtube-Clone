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
const router = express.Router();

router.get("/test", test);

//update user
router.put("/:id", updateUser);

//delete user
router.delete("/:id", deleteUser);

//get a user
router.get("/find/:id", getUser);

//subscribe a user
router.put("/sub/:id", subscribeUser);

//unsubscribe a user
router.put("/unsub/:id", unSubscribeUser);

//like a video
router.put("/like/:videoId", likeVideo);

//dislike a video
router.put("/dislike/:videoId", dislikeVideo);

export default router;
