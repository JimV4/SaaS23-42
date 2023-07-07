const fs = require("fs");
const StoredCharts = require(`${__dirname}/../models/storedChartsModel`);

/**
 * Create a user in the database with no charts.
 *
 * @param {Object} req - The HTTP request object. It contains the user's email. Its structure is as follows:
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
 * Save a chart image in the database.
 *
 * @param {Object} req - The HTTP request object. It contains the user's email and the chart's type, title and image. Its structure is as follows:
 * body: { email, type, title, image }
 *
 * @param {Object} res - Τhe HTTP response object. It contains the appropriate status code and message. Its structure is as follows:
 * - status: ( *"success"* | *"failed"* )
 * - message: ( *message* | *error_message* )
 *
 * @param {Function} next - The callback function to invoke the next middleware.
 *
 * @returns {void} This function does not return a value directly. It sends an HTTP response with the appropriate status code and message.
 *
 * @throws {Error} 400 Bad Request - If the type, title, email, or image of the chart is missing in the request body.
 * @throws {Error} 400 Bad Request - If the user no longer exists.
 * @throws {Error} 500 Internal Server Error - If an error occurs while creating the PNG file.
 * @throws {Error} 500 Internal Server Error - If something goes wrong while processing the request.
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
