const mongoose = require("mongoose");

const timestamps = require("mongoose-timestamp");

const commentModel = mongoose.Schema(
  {
    userName: { type: String, trim: true },
    userPic: { type: String, trim: true },
    content: { type: String, trim: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timeStamps: true,
  }
);

const Comment = mongoose.model("Comment", commentModel);

module.exports = Comment;
