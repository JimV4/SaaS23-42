const Quotas = require("../models/quotasModel");

exports.createUser = async (req, res, next) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide the email!",
      });
    }

    await Quotas.create({
      email: req.body.email,
    });

    return res.status(200).json({
      status: "success",
      message: "The user was successfully stored in the DB with 0 quotas.",
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong!",
    });
  }
};

exports.subQuotas = async (req, res, next) => {
  try {
    if (!req.body.chart_type || !req.body.email) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide the type of the chart and the email!",
      });
    }

    let user = await Quotas.find({
      email: req.body.email,
    });

    if (user.length == 0) {
      return res.status(400).json({
        status: "failed",
        message: "The user no longer exists!",
      });
    }

    let cost;
    if (req.body.chart_type == "line-chart") {
      cost = process.env.LINE_CHART_COST;
    } else if (req.body.chart_type == "multi-axis-line-chart") {
      cost = process.env.MULTI_AXIS_LINE_CHART_COST;
    } else if (req.body.chart_type == "radar-chart") {
      cost = process.env.RADAR_CHART_COST;
    } else if (req.body.chart_type == "scatter-chart") {
      cost = process.env.SCATTER_CHART_COST;
    } else if (req.body.chart_type == "bubble-chart") {
      cost = process.env.BUBBLE_CHART_COST;
    } else if (req.body.chart_type == "polar-area-chart") {
      cost = process.env.POLAR_AREA_CHART_COST;
    } else {
      return res.status(400).json({
        status: "failed",
        message: "Please provide a supported chart type as a parameter.",
      });
    }

    if (user[0].quotas < cost) {
      return res.status(403).json({
        status: "failed",
        message:
          "You do not have enough quotas to create this chart! Please buy some and come back.",
      });
    }

    user[0].quotas = user[0].quotas - cost;
    await user[0].save();

    return res.status(200).json({
      status: "success",
      message: "The user's quotas were successfully updated.",
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};
