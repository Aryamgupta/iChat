const mongoose = require("mongoose");

const timestamps = require("mongoose-timestamp");

const postModel = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    desc: { type: String, trim: true },

    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    pic: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timeStamps: true,
  }
);

const Post = mongoose.model("Post", postModel);

module.exports = Post;
