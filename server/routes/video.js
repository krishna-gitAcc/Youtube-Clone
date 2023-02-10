import express from "express";
const router = express.Router();
import {
  test,
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  addView,
  trendVideo,
  randomVideo,
  subVideo,
  getByTag,
  searchVideo,
} from "../controllers/video.js";
import { verifyToken } from "../middlewares/auth.js";
router.get("/test", test);

//create a video
router.post("/", verifyToken, addVideo);

//update a video
router.put("/:id", verifyToken, updateVideo);

//delete a video
router.delete("/:id", verifyToken, deleteVideo);

//get a video
router.get("/find/:id", getVideo);

//view a video
router.put("/view/:id", addView);

//trend video
router.get("/trend", trendVideo);

//random video
router.get("/random", randomVideo);

//subscription channel video
router.get("/sub", verifyToken, subVideo);

//search video by tags
router.get("/tags", getByTag);

//search video by title
router.get("/search", searchVideo);

export default router;
