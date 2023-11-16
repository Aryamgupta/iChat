const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  putPost,
  showAllPosts,
  commentOnPost,
  likeOnPost,
  getAllComments,
  getUserPosts,
} = require("../Controllers/postControllers");

const router = express.Router();

router.route("/").post(protect, putPost);
router.route("/").get(protect, showAllPosts);
router.route("/comment").put(protect, commentOnPost);
router.route("/getAllComments").post(protect, getAllComments);
router.route("/like").post(protect, likeOnPost);
router.route("/getUserPosts/:userId").get(protect, getUserPosts);

module.exports = router;
