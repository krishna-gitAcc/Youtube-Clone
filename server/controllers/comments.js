import { CreateCustomeError } from "../Helper/error.js";
import Comment from "../models/Comments.js";
import Video from "../models/Video.js";
export const test = (req, res) => {
  res.send("Hello from test api comments controller.");
};

export const addComment = async (req, res, next) => {
  const newCommnet = new Comment({ ...req.body, userId: req.user.id });
  try {
    const savedComment = await newCommnet.save();
    res.status(200).json({ success: true, data: savedComment });
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(comment.videoId);
    console.log(req.user.id);
    console.log(video.userId);
    if (req.user.id == comment.userId || req.user.id == video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ success: true, message: "The comment deleted successfully" });
    } else {
      return next(CreateCustomeError("you can delete only your comment!", 403));
    }
  } catch (err) {
    next(err);
  }
};

export const getComments = async (req, res, next) => {
  try {
    console.log(req.params.videoId);
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json({ success: true, data: comments });
  } catch (err) {
    next(err);
  }
};
