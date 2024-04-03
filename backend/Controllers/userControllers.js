const asynchHandler = require("express-async-handler");
const User = require("../Models/usersModel");
const generateToken = require("../config/generateToken");

const bcrypt = require("bcryptjs");

// @description   to sign up a user
// @route   POST /api/user
// @access  Unprotected
const registerUser = asynchHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // error for entries are missing
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  //   check if user already exists
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ email, name, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

// @description   to login in
// @route   POST /api/user/login
// @access  Unprotected
const authUser = asynchHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
    // res.status(201).json(user);
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

// @description   to get details of all users
// @route   GET /api/user?search=(keyword)
// @access  Protected
const allUsers = asynchHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

  res.send(users);
});

// @description   to get update details of the user
// @route   PUT /api/update
// @access  Protected

const updateUser = asynchHandler(async (req, res) => {
  try {
    const newPassword = req.body.newPassword
      ? await createPass(req.body.newPassword)
      : undefined;
    const newname = req.body.name;
    const newPic = req.body.pic;
    if (newPassword) {
      await User.findByIdAndUpdate(req.user._id, {
        $set: { password: newPassword },
      });
    }
    if (newname) {
      await User.findByIdAndUpdate(req.user._id, {
        $set: { name: newname },
      });
    }
    if (newPic) {
      await User.findByIdAndUpdate(req.user._id, {
        $set: { pic: newPic },
      });
    }

    const user = await User.findOne(req.user._id);
    res.send(user);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

// to create bycrpt string
const createPass = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports = { registerUser, authUser, allUsers, updateUser };
