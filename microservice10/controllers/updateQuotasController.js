const Quotas = require(`${__dirname}/../models/quotasModel`);

/**
 * Create a new user and store their information in the database.
 *
 * @param {Object} req - The HTTP request object. It contains the user's email. Its strutcure is as follows:
 * - body: { email }
 *
 * @param {Object} res - Τhe HTTP response object. It contains the appropriate status code and message. Its structure is as follows:
 * - status: ( *"success"* | *"failed"* )
 * - message: ( *message* | *error_message* )
 *
 * @param {Function} next - The callback function to invoke the next middleware.
 *
 * @returns {void} This function does not return a value directly. It sends an HTTP response with the appropriate status code and message.
 *
 * @throws {Error} 400 Bad Request - If the email is missing in the request body.
 * @throws {Error} 500 Internal Server Error - If something goes wrong while processing the request.
 */
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

/**
 * Deletes a user from the quotas collection.
 *
 * @param {Object} req - The HTTP request object. It contains the user's email. Its strutcure is as follows:
 * - body: { email }
 *
 * @param {Object} res - Τhe HTTP response object. It contains the appropriate status code and message. Its structure is as follows:
 * - status: ( *"success"* | *"failed"* )
 * - message: ( *message* | *error_message* )
 *
 * @param {Function} next - The callback function to invoke the next middleware.
 *
 * @returns {void} This function does not return a value directly. It sends an HTTP response with the appropriate status code and message.
 *
 * @throws {Error} 400 Bad Request - If the email is missing in the request body.
 * @throws {Error} 500 Internal Server Error - If something goes wrong while processing the request.
 */
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
 * Subtract quotas from a user's account for creating a chart.
 *
 * @param {Object} req - The HTTP request object. It contains the user's email and the chart's type. Its structure is as follows:
 * - body: { email, chart_type }
 *
 * @param {Object} res - The HTTP response object. It contains the appropriate status code and message. Its structure is as follows:
 * - status: ( *"success"* | *"failed"* )
 * - message: ( *message* | *error_message* )
 *
 * @param {Function} next - The callback function to invoke the next middleware.
 *
 * @returns {void} This function does not return a value directly. It sends an HTTP response with the appropriate status code and message.
 *
 * @throws {Error} 400 Bad Request - If the chart type or email is missing in the request body.
 * @throws {Error} 400 Bad Request - If the user no longer exists.
 * @throws {Error} 400 Bad Request - If an unsupported chart type is provided.
 * @throws {Error} 403 Forbidden - If the user does not have enough quotas to create the chart.
 * @throws {Error} 500 Internal Server Error - If something goes wrong while processing the request.
 */
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

/**
 * Undo the subtraction of quotas for a user's chart creation.
 *
 * @param {Object} req - The HTTP request object. It contains the user's email and the chart's type. Its structure is as follows:
 * - body: { email, chart_type }
 *
 * @param {Object} res - The HTTP response object. It contains the appropriate status code and message. Its structure is as follows:
 * - status: ( *"success"* | *"failed"* )
 * - message: ( *message* | *error_message* )
 *
 * @param {Function} next - The callback function to invoke the next middleware.
 *
 * @returns {void} This function does not return a value directly. It sends an HTTP response with the appropriate status code and message.
 *
 * @throws {Error} 400 Bad Request - If the chart type or email is missing in the request body.
 * @throws {Error} 400 Bad Request - If the user no longer exists.
 * @throws {Error} 400 Bad Request - If an unsupported chart type is provided.
 * @throws {Error} 500 Internal Server Error - If something goes wrong while processing the request.
 */
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
 * Add quotas to a user's account.
 *
 * @param {Object} req - The HTTP request object. It contains the user's email and the number of quotas to add. Its structure is as follows:
 * - body: { email, quotas }
 *
 * @param {Object} res - The HTTP response object. It contains the appropriate status code and message. Its structure is as follows:
 * - status: ( *"success"* | *"failed"* )
 * - message: ( *message* | *error_message* )
 *
 * @param {Function} next - The callback function to invoke the next middleware.
 *
 * @returns {void} This function does not return a value directly. It sends an HTTP response with the appropriate status code and message.
 *
 * @throws {Error} 400 Bad Request - If the number of quotas or email is missing in the request body.
 * @throws {Error} 400 Bad Request - If the user no longer exists.
 * @throws {Error} 500 Internal Server Error - If something goes wrong while processing the request.
 */
exports.addQuotas = async (req, res, next) => {
  try {
    if (!req.body.quotas || !req.body.email) {
      return res.status(400).json({
        status: "failed",
        message:
          "Please provide the email of the user and the number of quotas they want to purchase!",
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

    user[0].quotas = user[0].quotas + parseInt(req.body.quotas);
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
