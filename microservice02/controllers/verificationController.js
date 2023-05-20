const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.verifyLogin = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userID);

    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "The user no longer exists!",
      });
    }

    user.verified = true;
    user.lastLogin = user.currentLogin;
    user.currentLogin = Date.now();
    user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.status(200).json({
      status: "success",
      message: "You were successfully logged in!",
      token: token,
      email: user.email,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong!",
    });
  }
};

exports.cancelLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.params.userID,
      verified: false,
    });

    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "There is no not verified user with this ID.",
      });
    }

    await User.deleteOne({ _id: req.params.userID, verified: false });

    return res.status(200).json({
      status: "success",
      message: "The Google login was successfully canceled!",
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong!",
    });
  }
};
