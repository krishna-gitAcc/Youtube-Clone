import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addVideo,
  addView,
  deleteVideo,
  getByTags,
  getByTitle,
  getVideo,
  random,
  subs,
  trends,
  updateVideo,
} from "../Controllers/videoControllers.js";

const router = express.Router();

router.post("/", verifyToken, addVideo);
router.put("/:videoId", verifyToken, updateVideo);
router.delete("/:videoId", verifyToken, deleteVideo);
router.get("/find/:videoId", getVideo);
router.post("/view/:videoId", addView);
router.get("/random", random);
router.get("/trend", trends);
router.get("/sub", verifyToken, subs);
router.get("/tags", getByTags);
router.get("/search", getByTitle);

export default router;
