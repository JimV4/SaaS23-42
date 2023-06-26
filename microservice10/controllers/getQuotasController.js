const Quotas = require(`${__dirname}/../models/quotasModel`);

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
        message: "Please provide the type of the chart and the user's email!",
      });
    }

    let [user] = await Quotas.find({ email: req.body.email });

    if (user === undefined) {
      return res.status(400).json({
        status: "failed",
        message: "The user does not exist!",
      });
    }

    let cost;
    switch (req.body.chart_type) {
      case "line-chart":
        cost = process.env.LINE_CHART_COST;
        break;
      case "multi-axis-line-chart":
        cost = process.env.MULTI_AXIS_LINE_CHART_COST;
        break;
      case "radar_chart":
        cost = process.env.RADAR_CHART_COST;
        break;
      case "scatter-chart":
        cost = process.env.SCATTER_CHART_COST;
        break;
      case "bubble-chart":
        cost = process.env.BUBBLE_CHART_COST;
        break;
      case "polar-area-chart":
        cost = process.env.POLAR_AREA_CHART_COST;
        break;
      default:
        return res.status(400).json({
          status: "failed",
          message: "Please provide a supported chart type as a parameter.",
        });
    }

    if (user.quotas < cost) {
      return res.status(403).json({
        status: "failed",
        message: "The user does not have enough quotas to create this chart!",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "The user's quotas were successfully updated.",
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
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
        message: "Please provide the type of the chart and the user's email!",
      });
    }

    let [user] = await Quotas.find({ email: req.body.email });

    if (user === undefined) {
      return res.status(400).json({
        status: "failed",
        message: "The user does not exist!",
      });
    }

    return res.status(200).json({
      status: "success",
      data: user.quotas,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
