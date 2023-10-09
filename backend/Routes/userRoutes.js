const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  updateUser,
} = require("../Controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser).get(protect, allUsers);
router.post("/login", authUser);
router.route("/update").put(protect, updateUser);

module.exports = router;
