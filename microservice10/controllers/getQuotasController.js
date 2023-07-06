const Quotas = require("../models/quotasModel");

/**
 * Checks if a user has enough quotas to purchase a specified diagram.
 * @param {JSON} req - JSON object containing a body with the user's email and the type of the diagram.
 * @param {JSON} res - JSON object containing a confirmation/rejection of the request.
 * @param {function} next - Pointer to the next function in the middleware stack.
 * @return {JSON} - The response object.
 *
 * URL: {baseURL}/quotas/check
 */
exports.checkNumQuotas = async (req, res, next) => {
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

    console.log(req.body.chart_type);
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

    return res.status(200).json({
      status: "success",
      message: "The user has enough quotas to create this chart.",
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong!",
    });
  }
};

/**
 * Returns the number of quotas that a user has.
 * @param {JSON} req - JSON object containing a body with the user's email.
 * @param {JSON} res - JSON object containing a confirmation/rejection of the request.
 * @param {function} next - Pointer to the next function in the middleware stack.
 * @return {JSON} - The response object.
 *
 * URL: {baseURL}/quotas/num-quotas
 */
exports.getNumQuotas = async (req, res, next) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide the user's email!",
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

    return res.status(200).json({
      status: "success",
      data: user[0].quotas,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong!",
    });
  }
};
