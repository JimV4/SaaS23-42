const axios = require("axios");
const fs = require("fs");

/**
 * Get a PNG image of a chart or generate a PDF file if not available.
 *
 * @param {Object} req - The HTTP request object. It contains the user's email and the chart's type and image. Its structure is as follows:
 * - email: *email_address*
 * - body: { type, image }
 *
 * @param {Object} res - Τhe HTTP response object. It contains the appropriate status code and error message. Its structure is as follows:
 * - status: ( *"success"* | *"failed"* )
 * - message: ( *message* | *error_message* )
 *
 * @param {Function} next - The callback function to invoke the next middleware.
 *
 * @returns {void} This function does not return a value directly. It sends an HTTP response with the appropriate status code and error message.
 *
 * @throws {Error} 400 Bad Request - If the type or name of the PNG file is missing in the request body.
 * @throws {Error} 403 Forbidden - If the user tries to download a chart PDF they have not purchased.
 * @throws {Error} 500 Internal Server Error - If an error occurs while accessing or generating the PDF file.
 */
exports.getPNG = async (req, res, next) => {
  try {
    if (!req.body.type || !req.body.image) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide the type and the name of the PNG file!",
      });
    }

    if (req.body.image.split("_")[0] != req.email.split("@")[0]) {
      return res.status(403).json({
        status: "failed",
        message:
          "You cannot download a chart SVG image that you have not purchased!",
      });
    }

    fs.access(
      `${__dirname}/../public/${req.body.type}/${
        req.body.image.split(".")[0]
      }.svg`,
      fs.constants.F_OK,
      async (err) => {
        if (err) {
          const response = await axios({
            method: "get",
            url: `${process.env.STORED_CHARTS_SERVICE}/${req.body.type}/${req.body.image}`,
            responseType: "arraybuffer",
          });

          req.image = response.data;
          next();
        } else {
          res.set("Content-Type", "image/svg+xml");
          res.set(
            "Content-Disposition",
            `attachment; filename="${req.body.image.split(".")[0]}.svg"`
          );

          return fs
            .createReadStream(
              `${__dirname}/../public/${req.body.type}/${
                req.body.image.split(".")[0]
              }.svg`
            )
            .pipe(res);
        }
      }
    );
  } catch (err) {
    if (err.response) {
      return res.status(err.response.status).json({
        status: "failed",
        message: err.response.data.message,
      });
    }
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};
