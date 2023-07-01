const Quotas = require(`${__dirname}/../models/quotasModel`);

/**
 * Creates and stores a user's email with the number of the user's quotas (initially zero).
 * @param {JSON} req - JSON object containing a body with the user's email.
 * @param {JSON} res - JSON object containing a confirmation/rejection of the request.
 * @param {function} next - Pointer to the next function in the middleware stack
 * @return {JSON} - The response object.
 *
 * URL: {baseURL}/quotas/create
 */
exports.createUser = async (req, res, next) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide the user's email!",
      });
    }

    await Quotas.create({ email: req.body.email, quotas: 0 });

    return res.status(200).json({
      status: "success",
      message: "The user's email was successfully stored with 0 quotas.",
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong!",
    });
  }
};

exports.undoCreateUser = async (req, res, next) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide the email!",
      });
    }

    await Quotas.deleteOne({
      email: req.body.email,
    });

    return res.status(200).json({
      status: "success",
      message: "The user was successfully deleted!",
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong!",
    });
  }
};

/**
 * Subtracts quotas from a user after they've done a purchase.
 * @param {JSON} req - JSON object containing a body with the user's email and the used quotas.
 * @param {JSON} res - JSON object containing a confirmation/rejection of the request.
 * @param {function} next - Pointer to the next function in the middleware stack
 * @return {JSON} - The response object.
 *
 * URL: {baseURL}/quotas/sub
 */
exports.subQuotas = async (req, res, next) => {
  try {
    if (!req.body.chart_type || !req.body.email) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide the type of the chart and the user's email!",
      });
    }

    let [user, ...users] = await Quotas.find({ email: req.body.email });

    if (user === undefined || users !== []) {
      return res.status(400).json({
        status: "failed",
        message:
          user === undefined
            ? "The user doesn't exist/no longer exists!"
            : "Error! Multiple users share the same email address!",
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

    user.quotas -= cost;
    await user.save();

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

exports.undoSubQuotas = async (req, res, next) => {
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

    user[0].quotas = user[0].quotas + cost;
    await user[0].save();

    return res.status(200).json({
      status: "success",
      message: "The user's quotas were successfully restored.",
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

/**
 * Adds quotas to a user after they've made a purchase.
 * @param {JSON} req - JSON object containing a body with the user's email and the number of purchased quotas.
 * @param {JSON} res - JSON object containing a confirmation/rejection of the request.
 * @param {function} next - Pointer to the next function in the middleware stack
 * @return {JSON} - The response object.
 *
 * URL: {baseURL}/quotas/add
 */
exports.addQuotas = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.quotas) {
      return res.status(400).json({
        status: "failed",
        message:
          "Please provide the user's email and the number of quotas to be purchased!",
      });
    }

    let [user, ...users] = await Quotas.find({ email: req.body.email });

    if (user === undefined || users !== []) {
      return res.status(400).json({
        status: "failed",
        message:
          user === undefined
            ? "The user doesn't exist/no longer exists!"
            : "Error! Multiple users share the same email address!",
      });
    }

    user.quotas = user.quotas + parseInt(req.body.quotas);
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "The quotas were successfully purchased.",
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
