const asynchHandler = require("express-async-handler");
const User = require("../Models/usersModel");
const Post = require("../Models/postModel");
const Comment = require("../Models/commentModel");
const { post } = require("moongose/routes");

// @description   to create a new post
// @route   POST /api/post/
// @access  Protected
const putPost = asynchHandler(async (req, res) => {
  const { desc, pic } = req.body;

  if (!desc && !pic) {
    res.status(400);
    throw new Error("Please fill atleast one of the fields");
  }

  const post = await Post.create({ userId: req.user._id, desc, pic });

  if (post) {
    res.status(201).json(post);
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

// @description   to show all posts
// @route   GET /api/post/
// @access  Protected
const showAllPosts = asynchHandler(async (req, res) => {
  const allPost = await Post.find({}).populate("userId");
  if (allPost) {
    res.status(201).json(allPost);
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

// @description   to comment on a particular post
// @route   PUT /api/post/comment
// @access  Protected
const commentOnPost = asynchHandler(async (req, res) => {
  const { postId, content } = req.body;

  if (!postId) {
    res.send(400);
    throw new Error("No Post To Comment");
  }

  if (!content) {
    res.send(400);
    throw new Error("No Comment To Post");
  }

  var comm = {
    postId,
    content,
    userName: req.user.name,
    userPic: req.user.pic,
    createdAt: new Date(),
  };

  var comment = await Comment.create(comm);

  if (comment) {
    var commen = await Comment.findOne({ _id: comment._id });

    var postCmt = await Post.findOne({ _id: postId });

    var { comments } = postCmt;
    var reply = await Post.findOneAndUpdate(
      { _id: postId },
      { comments: [commen._id, ...comments] }
    );
    res.status(200).json(commen);
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

// @description   to get all the comments of a particular post
// @route   POST /api/post/getAllComments
// @access  Protected
const getAllComments = asynchHandler(async (req, res) => {
  const { postId } = req.body;

  if (!postId) {
    res.status(400);
    throw new Error("No Post");
  }

  try {
    var { comments } = await Post.findById(postId).populate("comments");

    res.status(201).send(comments);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// @description   to like a particular post
// @route   POST /api/post/like
// @access  Protected
const likeOnPost = asynchHandler(async (req, res) => {
  const { postId } = req.body;
  if (!postId) {
    res.status(400);
    throw new Error("No post");
  }

  try {
    let { likedBy } = await Post.findById(postId);
    let temp;
    if (likedBy.includes(req.user._id)) {
      temp = likedBy.filter((e) => {
        e !== req.user._id;
      });
    } else {
      temp = [...likedBy, req.user._id];
    }
    let data = await Post.findOneAndUpdate({ _id: postId }, { likedBy: temp });

    res.status(201).send(temp);
  } catch (error) {
    res.status(400);
    res.send(error.message);
  }
});

// @description   to get all the post of a user
// @route   GET /api/post/:userId
// @access  Protected
const getUserPosts = asynchHandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    const allPost = await Post.find({ userId: userId }).populate("userId");
    res.status(200).json(allPost);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  putPost,
  showAllPosts,
  commentOnPost,
  likeOnPost,
  getUserPosts,
  getAllComments,
};
