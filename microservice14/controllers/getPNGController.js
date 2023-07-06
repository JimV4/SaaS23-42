const axios = require("axios");
const fs = require("fs");

/**
 * Downloads the PNG image of the chart from the user.
 * @param {JSON} req - JSON object containing a body with the image and type of the chart.
 * @param {JSON} res - JSON object containing a confirmation/rejection of the request.
 * @param {function} next - Pointer to the next function in the middleware stack.
 * @return {JSON}
 * The function returns a read stream for the PNG image to be downloaded or,
 * if an error has occurred, an object containing the fields below:
 * - status: "failed"
 * - message: <error message>
 *
 * URL: {baseURL}/html-converter/download
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
          "You cannot download a chart HTML file that you have not purchased!",
      });
    }

    fs.access(
      `${__dirname}/../public/${req.body.type}/${
        req.body.image.split(".")[0]
      }.html`,
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
          res.set("Content-Type", "text/html");
          res.set(
            "Content-Disposition",
            `attachment; filename="${req.body.image.split(".")[0]}.html"`
          );

          return fs
            .createReadStream(
              `${__dirname}/../public/${req.body.type}/${
                req.body.image.split(".")[0]
              }.html`
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
