const fs = require("fs");
const StoredCharts = require("../models/storedChartsModel");

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

    await StoredCharts.create({
      email: req.body.email,
    });

    return res.status(200).json({
      status: "success",
      message: "The user was successfully stored in the DB with no charts.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong!",
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
  try {
    if (
      !req.body.type ||
      !req.body.title ||
      !req.body.email ||
      !req.body.image
    ) {
      return res.status(400).json({
        status: "failed",
        message:
          "Please provide the type, title and image of the chart to be stored and the user's email!",
      });
    }

    const user = await StoredCharts.find({
      email: req.body.email,
    });

    if (user.length == 0) {
      return res.status(400).json({
        status: "failed",
        message: "The user no longer exists!",
      });
    }

    const base64Data = req.body.image.split(";base64,").pop();
    const imageName = `${req.body.email.split("@")[0]}_${Date.now()}.png`;

    fs.writeFile(
      `${__dirname}/../public/${req.body.type}/${imageName}`,
      base64Data,
      { encoding: "base64" },
      async (err) => {
        if (err) {
          return res.status(500).json({
            status: "failed",
            message: "Error creating PNG file!",
          });
        } else {
          user[0].storedCharts.push({
            imageURL: imageName,
            type: req.body.type,
            title: req.body.title,
            createdOn: Date.now(),
          });
          await user[0].save();

          return res.status(200).json({
            status: "success",
            message: "The user's chart was successfully saved in the DB.",
          });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};
