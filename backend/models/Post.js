import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    creator: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    selectedFile: {
      type: String,
    },
    likes: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
      {
        timestamps: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("post", PostSchema);
export default Post;
