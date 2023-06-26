const fs = require("fs");
const StoredCharts = require(`${__dirname}/../models/storedChartsModel`);

/**
 * Returns the number of stored charts of a specific user.
 * @param {JSON} req - JSON object containing a body with the user's email.
 * @param {JSON} res - JSON object containing a confirmation/rejection of the request.
 * @param {function} next - Pointer to the next function in the middleware stack.
 * @return {JSON}
 * An object containing the fields below:
 * - status: "success" or "failed"
 * - data: the number of the user's stored charts.
 * - message: (only if an error has occured)
 *
 * URL: {baseURL}/stored-charts/num-charts
 */
exports.getNumCharts = async (req, res, next) => {
  next();
};

/**
 * Returns the stored charts of a specific user.
 * @param {JSON} req - JSON object containing a body with the user's email.
 * @param {JSON} res - JSON object containing a confirmation/rejection of the request.
 * @param {function} next - Pointer to the next function in the middleware stack.
 * @return {JSON}
 * An object containing the fields below:
 * - status: "success" or "failed"
 * - data: an array containing the stored charts of the user
 * - message: (only if an error has occured)
 *
 * URL: {baseURL}/stored-charts/user-charts
 */
exports.getUserCharts = async (req, res, next) => {
  next();
};

/**
 * Downloads a stored chart of a specific user.
 * @param {JSON} req - JSON object containing the user's email and a body with the chart's type and PNG image.
 * @param {JSON} res - JSON object containing a confirmation/rejection of the request.
 * @param {function} next - Pointer to the next function in the middleware stack.
 * @return {JSON}
 * An object containing the fields below:
 * - status: "success" or "failed"
 * - message: (only if an error has occured)
 *
 * URL: {baseURL}/stored-charts/download-png
 */
exports.downloadChart = (req, res, next) => {
  next();
};
