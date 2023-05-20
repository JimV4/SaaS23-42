const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.GoogleCallback = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.name) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide clientID, email and name!",
      });
    }

    let user = await User.findOne({
      email: req.body.email,
    });

    if (!user || user.verified == false) {
      if (!user) {
        user = await User.create({
          email: req.body.email,
          displayName: req.body.name,
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Please verify your login!",
        userID: user._id,
      });
    }

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
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong!",
    });
  }
};

exports.isLoggedIn = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        status: "failed",
        message: "You are not logged in. You need to log in to have access!",
      });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: "failed",
        message: "The user belonging to this token no longer exists!",
      });
    }

    return res.status(200).json({
      status: "success",
      email: currentUser.email,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong!",
    });
  }
};

exports.getLastLogin = async (req, res, next) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide the user's email!",
      });
    }

    const user = await User.find({
      email: req.body.email,
    });

    if (user.length == 0) {
      return res.status(400).json({
        status: "success",
        message: "The user no longer exists.",
      });
    }

    let lastLogin;

    if (user[0].lastLogin) {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "Europe/Athens",
        timeZoneName: "short",
      };

      const formattedDate = user[0].lastLogin.toLocaleDateString(
        "en-US",
        options
      );

      lastLogin = formattedDate;
    } else {
      lastLogin = "-";
    }

    return res.status(200).json({
      status: "success",
      data: lastLogin,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};
