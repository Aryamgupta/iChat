const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  fetchChats,
  accessChat,
  createGroupChat,
  renameGroup,
  removeFromGroupChat,
  addToGroupChat
} = require("../Controllers/chatControllers");

const router = express.Router();

router.route("/").post(protect, accessChat)
router.route('/').get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupadd").put(protect, addToGroupChat);
router.route("/groupremove").put(protect, removeFromGroupChat);

module.exports = router;
