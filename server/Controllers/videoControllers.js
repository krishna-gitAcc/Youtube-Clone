import { query } from "express";
import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const addVideo = async (req, res, next) => {
  try {
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    const video = await newVideo.save();
    res.status(200).json({
      success: true,
      message: "video created successfully",
      data: video,
    });
  } catch (error) {
    next(error);
  }
};
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) return next(createError(404, "video not found"));
    if (req.user.id != video.userId)
      return next(createError(403, "unauthorize access"));

    const updatedVideo = await Video.findOneAndUpdate(
      { _id: req.params.videoId },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "video updated successfully",
      data: updatedVideo,
    });
  } catch (error) {
    return next(error);
  }
};
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) return next(createError(404, "video not found"));
    if (req.user.id != video.userId)
      return next(createError(403, "unauthorize access"));

    const deletedVideo = await Video.findOneAndDelete({
      _id: req.params.videoId,
    });
    res.status(200).json({
      success: true,
      message: "video deleted successfully",
      data: deletedVideo,
    });
  } catch (error) {
    return next(error);
  }
};
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findOne({ _id: req.params.videoId });
    if (!video) return next(createError(404, "video not found"));
    res.status(200).json({
      success: true,
      message: "video fetch successfully",
      data: video,
    });
  } catch (error) {
    return next(error);
  }
};
export const addView = async (req, res, next) => {
  try {
    const updatedVideo = await Video.findOneAndUpdate(
      { _id: req.params.videoId },
      {
        $inc: { videoView: 1 },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "view is added successfully",
      data: updatedVideo,
    });
  } catch (error) {
    return next(error);
  }
};
export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json({
      success: true,
      message: "video is fetch successfully",
      data: videos,
    });
  } catch (error) {
    return next(error);
  }
};
export const trends = async (req, res, next) => {
  try {
    const video = await Video.find().sort({ videoView: -1 });

    res.status(200).json({
      success: true,
      message: "video fetch successfully",
      data: video,
    });
  } catch (error) {
    return next(error);
  }
};
export const subs = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const subscribedChannel = user.subscribedUsers;
    const list = await Promise.all(
      subscribedChannel.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );

    res.status(200).json({
      success: true,
      message: "video fetch successfully",
      data: list.flat().sort((a, b) => b.createdAt - a.createdAt),
    });
  } catch (error) {
    return next(error);
  }
};

export const getByTags = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  console.log(tags);
  try {
    const video = await Video.find({ videoTag: { $in: tags } }).limit(20);

    res.status(200).json({
      success: true,
      message: "video fetch successfully",
      data: video,
    });
  } catch (error) {
    return next(error);
  }
};
export const getByTitle = async (req, res, next) => {
  const query = req.query.q;
  console.log(query, "from video find page");
  try {
    const video = await Video.find({
      title: new RegExp(`^${query}`, "i") || null,
    }).limit(40);

    res.status(200).json({
      success: true,
      message: "video fetch successfully",
      data: video,
    });
  } catch (error) {
    return next(error);
  }
};
