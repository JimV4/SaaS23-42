const fs = require("fs");
const StoredCharts = require("../models/storedChartsModel");

/**
 * Get the number of stored charts for a user.
 *
 * @param {Object} req - The HTTP request object. It contains the user's email. Its structure is as follows:
 * body: { email }
 *
 * @param {Object} res - The HTTP response object. It contains the appropriate status code, and the data or an error message. Its structure is as follows:
 * - status: ( *"success"* | *"failed"* ),
 * - data: [ *number_of_charts* ] (only if an error doesn't occur)
 * - message: [ *error_message* ] (only if an error occurs)
 *
 * @param {Function} next - The callback function to invoke the next middleware.
 *
 * @returns {void} This function does not return a value directly. It sends an HTTP response with the appropriate status code and data/error message.
 *
 * @throws {Error} 400 Bad Request - If the email is missing in the request body.
 * @throws {Error} 400 Bad Request - If the user no longer exists.
 * @throws {Error} 500 Internal Server Error - If something goes wrong while processing the request.
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
 * Get the stored charts of a user.
 *
 * @param {Object} req - The HTTP request object. It contains the user's email. Its structure is as follows:
 * body: { email }
 *
 * @param {Object} res - The HTTP response object. It contains the appropriate status code, and the data or an error message. Its structure is as follows:
 * - status: ( *"success"* | *"failed"* ),
 * - data: [ *number_of_charts* ] (only if an error doesn't occur)
 * - message: [ *error_message* ] (only if an error occurs)
 *
 * @param {Function} next - The callback function to invoke the next middleware.
 *
 * @returns {void} This function does not return a value directly. It sends an HTTP response with the appropriate status code and data/error message.
 *
 * @throws {Error} 400 Bad Request - If the user's email is missing in the request body.
 * @throws {Error} 400 Bad Request - If the user no longer exists.
 * @throws {Error} 500 Internal Server Error - If something goes wrong while processing the request.
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
 * Download a PNG chart image.
 *
 * @param {Object} req - The HTTP request object. It contains the user's email and the chart's type and image. Its structure is as follows:
 * - email: *email_address*
 * - body: { type, image }
 *
 * @param {Object} res - Τhe HTTP response object. It contains the appropriate status code and message. Its structure is as follows:
 * - status: ( *"success"* | *"failed"* )
 * - message: ( *message* | *error_message* )
 *
 * @param {Function} next - The callback function to invoke the next middleware.
 *
 * @returns {void} This function does not return a value directly. It sends an HTTP response with the appropriate status code and message.
 *
 * @throws {Error} 400 Bad Request - If the name or type of the PNG file is missing in the request body.
 * @throws {Error} 403 Forbidden - If the user tries to download a chart PNG image they have not purchased.
 * @throws {Error} 400 Bad Request - If the requested file does not exist.
 * @throws {Error} 500 Internal Server Error - If something goes wrong while processing the request.
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
