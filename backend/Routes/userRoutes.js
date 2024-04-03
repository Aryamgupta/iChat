const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  updateUser,
} = require("../Controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/").get(protect, allUsers);
router.route("/login").post(authUser);
router.route("/update").put(protect, updateUser);

module.exports = router;
