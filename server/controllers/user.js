import { CreateCustomeError } from "../Helper/error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const test = (req, res) => {
  res.send("Hello from test api user controller.");
};

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const result = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        {
          new: true,
        }
      );
      const { password, ...user } = result._doc;
      return res.status(200).json({ success: true, data: user });
      return;
    } catch (err) {
      return next(err);
    }
  } else {
    return next(CreateCustomeError("You can update only your account!", 403));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const result = await User.findByIdAndDelete(req.params.id);
      const { password, ...user } = result._doc;
      return res.status(200).json({ success: true, data: user });
      return;
    } catch (err) {
      return next(err);
    }
  } else {
    return next(CreateCustomeError("You can delete only your account!", 403));
  }
};

export const getUser = async (req, res, next) => {
  try {
    let result = await User.findById(req.params.id);
    const { password, ...user } = result._doc;
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const subscribeUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res
      .status(200)
      .json({ success: true, message: "Subscription Successful." });
  } catch (err) {
    next(err);
  }
};

export const unSubscribeUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { subscribers: -1 },
    });
    res
      .status(200)
      .json({ success: true, message: "UnSubscription Successful." });
  } catch (err) {
    next(err);
  }
};

export const likeVideo = async (req, res, next) => {
  const videoId = req.params.videoId;
  const id = req.user.id;
  try {
    await Video.findByIdAndUpdate(
      videoId,
      {
        $addToSet: { likes: id },
        $pull: { dislikes: id },
      },
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ success: true, message: "successfull like the video" });
  } catch (err) {
    next(err);
  }
};

export const dislikeVideo = async (req, res, next) => {
  const videoId = req.params.videoId;
  const id = req.user.id;
  try {
    console.log(id);
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res
      .status(200)
      .json({ success: true, message: "successfully Dislike the video." });
  } catch (err) {
    next(err);
  }
};
