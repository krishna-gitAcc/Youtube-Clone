import mongoose from "mongoose";

const { Schema } = mongoose;

const CommentSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    videoId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Comment", CommentSchema);
