import { createError } from "../error.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";
export const addComment = async (req, res, next) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });
  try {
    const savedComment = await newComment.save();
    res.status(200).json({
      success: true,
      message: "comment is added successfully",
      data: savedComment,
    });
  } catch (error) {
    return next(error);
  }
};
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findOne({
      _id: req.params.commentId,
    });
    const video = await Video.findOne({
      _id: comment.videoId,
    });
    if (
      req.user.id === comment.userId.toString() ||
      req.user.id === video.userId
    ) {
      const deletedComment = await Comment.findOneAndDelete({
        _id: req.params.commentId,
      });
      res.status(200).json({
        success: true,
        message: "comment is deleted successfully.",
        data: deletedComment,
      });
    } else {
      return next(createError("400", "unauthorized access."));
    }
  } catch (error) {
    return next(error);
  }
};
export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json({
      success: true,
      message: "fetched all comments successfully",
      data: comments,
    });
  } catch (error) {
    return next(error);
  }
};
