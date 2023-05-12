const fs = require("fs");
const StoredCharts = require("../models/storedChartsModel");

exports.createUser = async (req, res, next) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide the email!",
      });
    }

    await StoredCharts.create({
      email: req.body.email,
    });

    return res.status(200).json({
      status: "success",
      message: "The user was successfully stored in the DB with no charts.",
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong!",
    });
  }
};

exports.saveChart = async (req, res, next) => {
  try {
    if (!req.body.path || !req.body.email) {
      return res.status(400).json({
        status: "failed",
        message:
          "Please provide the path of the chart to be stored and the user's email!",
      });
    }

    let fullPath = `${__dirname}/../../frontend/src/assets/charts/${req.body.path}`;

    fs.access(fullPath, fs.constants.F_OK, async (err) => {
      if (err) {
        return res.status(400).json({
          status: "failed",
          message: "The chart no longer exists!",
        });
      }

      const user = await StoredCharts.find({
        email: req.body.email,
      });

      if (user.length == 0) {
        return res.status(400).json({
          status: "failed",
          message: "The user no longer exists!",
        });
      }

      user[0].storedCharts.push(req.body.path);
      await user[0].save();

      return res.status(200).json({
        status: "success",
        message: "The user's chart was successfully saved in the DB.",
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong!",
    });
  }
};
