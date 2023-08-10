import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const updateUser = async (req, res, next) => {
  try {
    if (req.params.userId != req.user.id) {
      return next(createError(403, "unauthorized access"));
    }
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    );

    const { password, ...otherDetails } = updatedUser._doc;

    res.json({ data: otherDetails });
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    if (req.params.userId != req.user.id) {
      return next(createError(403, "unauthorized access"));
    }
    const updatedUser = await User.findOneAndDelete({ _id: req.params.userId });

    const { password, ...otherDetails } = updatedUser._doc;

    res.json({
      success: true,
      message: "deleted successfully",
      data: otherDetails,
    });
  } catch (error) {
    next(error);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    const { password, ...others } = user._doc;
    res.status(200).json({ success: true, data: others });
  } catch (error) {
    next(error);
  }
};
export const subscribeUser = async (req, res, next) => {
  if (req.user.id === req.params.userId) {
    return next(createError(400, "invalid request"));
  }
  try {
    await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $push: { subscribedUsers: req.params.userId },
      },
      { new: true }
    ).exec();
    await User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $inc: { subscribers: 1 },
      }
    );
    res.status(200).json({ success: true, message: "subscribe successful" });
  } catch (error) {
    next(error);
  }
};
export const unSubscribeUser = async (req, res, next) => {
  if (req.user.id === req.params.userId) {
    return next(createError(400, "invalid request"));
  }
  try {
    await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $pull: { subscribedUsers: req.params.userId },
      }
    );
    await User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $inc: { subscribers: -1 },
      }
    );
    res.status(200).json({ success: true, message: "unsubscribe successful" });
  } catch (error) {
    next(error);
  }
};
export const likeVideo = async (req, res, next) => {
  try {
    const video = await Video.find({ _id: req.params.videoId });
    if (!video) return next(createError(404, "video not found"));
    const updatedVideo = await Video.findOneAndUpdate(
      { _id: req.params.videoId },
      {
        $addToSet: { videoLikes: req.user.id },
        $pull: { videoDislikes: req.user.id },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Video liked successfully",
      data: updatedVideo,
    });
  } catch (error) {
    return next(error);
  }
};
export const disLikeVideo = async (req, res, next) => {
  try {
    const video = await Video.find({ _id: req.params.videoId });
    if (!video) return next(createError(404, "video not found"));
    const updatedVideo = await Video.findOneAndUpdate(
      { _id: req.params.videoId },
      {
        $pull: { videoLikes: req.user.id },
        $addToSet: { videoDislikes: req.user.id },
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      message: "Video disliked successfully",
      data: updatedVideo,
    });
  } catch (error) {
    return next(error);
  }
};
