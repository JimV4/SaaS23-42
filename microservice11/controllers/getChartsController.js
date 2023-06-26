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
  try {
    if (!req.body.email) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide the user's email!",
      });
    }

    let [user, ...users] = await StoredCharts.find({ email: req.body.email });

    if (user === undefined || users !== []) {
      return res.status(400).json({
        status: "failed",
        message:
          user === undefined
            ? "The user doesn't exist/no longer exists!"
            : "Error! Multiple users share the same email address!",
      });
    }

    return res.status(200).json({
      status: "success",
      data: user.storedCharts.length,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong!",
    });
  }
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
  try {
    if (!req.body.email) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide the user's email!",
      });
    }

    let [user, ...users] = await StoredCharts.find({ email: req.body.email });

    if (user === undefined || users !== []) {
      return res.status(400).json({
        status: "failed",
        message:
          user === undefined
            ? "The user doesn't exist/no longer exists!"
            : "Error! Multiple users share the same email address!",
      });
    }

    const options = [
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Europe/Athens",
      },
    ];

    let charts = [];
    user.storedCharts.forEach((storedChart) => {
      const createdOn = storedChart.createdOn;
      const formattedDate = `${createdOn.getDate()}:${
        createdOn.getMonth() + 1
      }:${createdOn.getFullYear()} ${createdOn.toLocaleTimeString(...options)}`;

      charts.push({
        imageURL: storedChart.imageURL,
        title: storedChart.title,
        type: storedChart.type,
        createdOn: formattedDate,
      });
    });

    return res.status(200).json({
      status: "success",
      data: charts,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
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
  try {
    if (!req.body.type || !req.body.image) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide the name and the type of the PNG file!",
      });
    }

    if (req.body.image.split("_")[0] != req.email.split("@")[0]) {
      return res.status(403).json({
        status: "failed",
        message: "You cannot download a chart PNG image that you do not own!",
      });
    }

    let file = `${__dirname}/../public/${req.body.type}/${req.body.image}`;

    fs.access(file, fs.constants.F_OK, (error) => {
      if (error) {
        return res.status(400).json({
          status: "failed",
          message: "The requested file does not exist.",
        });
      }

      res.set("Content-Type", "application/json");
      res.download(file);
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
