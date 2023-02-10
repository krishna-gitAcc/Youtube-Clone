import Video from "../models/Video.js";
import User from "../models/User.js";
import { CreateCustomeError } from "../Helper/error.js";
export const test = (req, res) => {
  res.send("Hello from test api video controller.");
};

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    await newVideo.save();
    res.status(200).json({ success: true, data: newVideo });
  } catch (err) {
    next(err);
  }
};
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return next(CreateCustomeError("Video not found!", 404));
    }
    if (req.user.id === video.userId) {
      const result = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({ success: true, data: result });
    } else {
      return next(CreateCustomeError("You can update your own video", 403));
    }
  } catch (err) {
    next(err);
  }
};
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return next(CreateCustomeError("Video not found!", 404));
    }
    if (req.user.id == video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ success: true, message: "Video has been deleted." });
    } else {
      return next(CreateCustomeError("You can delete your own video", 403));
    }
  } catch (err) {
    next(err);
  }
};
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json({ success: true, data: video });
  } catch (err) {
    next(err);
  }
};

export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    res
      .status(200)
      .json({ success: true, message: "The view has been increased." });
  } catch (err) {
    next(err);
  }
};

export const randomVideo = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json({ success: true, data: videos });
  } catch (err) {
    next(err);
  }
};

export const trendVideo = async (req, res, next) => {
  try {
    const video = await Video.find().sort({ views: -1 });
    res.status(200).json({ success: true, data: video });
  } catch (err) {
    next(err);
  }
};

export const subVideo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );

    res.status(200).json({
      success: true,
      data: list.flat().sort((a, b) => {
        return b.createdAt - a.createdAt;
      }),
    });
  } catch (err) {
    next(err);
  }
};

export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  console.log(tags);
  try {
    const video = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json({ success: true, data: video });
  } catch (err) {
    next(err);
  }
};

export const searchVideo = async (req, res, next) => {
  const query = req.query.q;
  try {
    const video = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(20);
    res.status(200).json({ success: true, data: video });
  } catch (err) {
    next(err);
  }
};
