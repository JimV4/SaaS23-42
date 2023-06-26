const fs = require("fs");
const StoredCharts = require(`${__dirname}/../models/storedChartsModel`);

/**
 * Creates a user in the database so he/she can later store charts.
 * @param {JSON} req - JSON object containing a body with the user's email.
 * @param {JSON} res - JSON obejct containing a confirmation/rejection of the request.
 * @param {function} next - Pointer to the next function in the middleware stack.
 * @return {JSON}
 * An object containing the fields below:
 * - status: "success" or "failed"
 * - message: a correlating message or an error message, if an error has occurred
 *
 * URL: {baseURL}/stored-charts/create
 */
exports.createUser = async (req, res, next) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide the email!",
      });
    }

    await StoredCharts.create({ email: req.body.email });

    return res.status(200).json({
      status: "success",
      message: "The user was successfully stored in the DB with no charts.",
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

/**
 * Saves a user's chart.
 * @param {JSON} req - JSON object containing a body with the chart's type, title and image, and the user's email.
 * @param {JSON} res - JSON object containing a confirmtion/rejection of the request.
 * @param {function} next - Pointer to the next function in the middlware stack.
 * @return {JSON}
 * An object containig the fields below:
 * - status: "success" or "failed"
 * - message: a correlating message or an error message, if an error has occurred
 *
 * URL: {baseURL}/stored-charts/save-chart
 */
exports.saveChart = async (req, res, next) => {
  next();
};
