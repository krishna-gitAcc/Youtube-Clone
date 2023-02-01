import express from "express";

const router = express.Router();

import authRoutes from "./auth.js";
import commentsRoutes from "./comments.js";
import userRoutes from "./user.js";
import videoRoutes from "./video.js";

router.use("/auth", authRoutes);
router.use("/comments", commentsRoutes);
router.use("/user", userRoutes);
router.use("/video", videoRoutes);

export default router;
