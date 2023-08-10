import express from "express";
const router = express.Router();
import videoRoutes from "./videosRoutes.js";
import userRoutes from "./usersRoutes.js";
import commentRoutes from "./commentsRoutes.js";
import authRoutes from "./authRoutes.js";

router.use("/users", userRoutes);
router.use("/videos", videoRoutes);
router.use("/comments", commentRoutes);
router.use("/auth", authRoutes);

export default router;
