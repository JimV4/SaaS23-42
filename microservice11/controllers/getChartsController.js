const StoredCharts = require("../models/storedChartsModel");

exports.getNumCharts = async (req, res, next) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide the user's email!",
      });
    }

    let user = await StoredCharts.find({
      email: req.body.email,
    });

    if (user.length == 0) {
      return res.status(400).json({
        status: "failed",
        message: "The user no longer exists!",
      });
    }

    return res.status(200).json({
      status: "success",
      data: user[0].storedCharts.length,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong!",
    });
  }
};
