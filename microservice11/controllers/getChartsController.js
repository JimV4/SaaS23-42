const fs = require("fs");
const StoredCharts = require("../models/storedChartsModel");

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

    let user = await StoredCharts.find({
      email: req.body.email,
    });

    if (user.length == 0) {
      return res.status(400).json({
        status: "failed",
        message: "The user no longer exists!",
      });
    }

    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/Athens",
    };

    let charts = [];

    for (i = 0; i < user[0].storedCharts.length; i++) {
      const createdOn = user[0].storedCharts[i].createdOn;
      const formattedDate = `${createdOn.getDate()}:${
        createdOn.getMonth() + 1
      }:${createdOn.getFullYear()} ${createdOn.toLocaleTimeString(
        "en-US",
        options
      )}`;

      charts.push({
        imageURL: user[0].storedCharts[i].imageURL,
        title: user[0].storedCharts[i].title,
        type: user[0].storedCharts[i].type,
        createdOn: formattedDate,
      });
    }

    return res.status(200).json({
      status: "success",
      data: charts,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
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
        message:
          "You cannot download a chart PNG image that you have not purchased!",
      });
    }

    let file = `${__dirname}/../public/${req.body.type}/${req.body.image}`;

    fs.access(file, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(400).json({
          status: "failed",
          message: "The requested file does not exist.",
        });
      }

      res.set("Content-Type", "application/json");
      res.download(file);
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong!",
    });
  }
};
