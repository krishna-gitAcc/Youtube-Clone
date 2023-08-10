import mongoose from "mongoose";

const { Schema } = mongoose;

const videoSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    videoView: {
      type: Number,
      default: 0,
    },
    videoTag: {
      type: [String],
      default: [],
    },
    videoLikes: {
      type: [String],
      default: [],
    },
    videoDislikes: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Video", videoSchema);
