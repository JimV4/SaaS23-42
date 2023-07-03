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
 * URL: {baseURL}/pdf-converter/download
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
        message: "You cannot download a PDF file that you have not purchased!",
      });
    }

    let pdfFileName = `${req.body.image.split(".")[0]}.pdf`;
    let pdfFilePath = `${__dirname}/../public/${req.body.type}/${pdfFileName}`;

    fs.access(pdfFilePath, fs.constants.F_OK, async (pdfFileNotFound) => {
      if (pdfFileNotFound) {
        const { data, ...rest } = await axios({
          method: "get",
          url: `${process.env.STORED_CHARTS_SERVICE}/${req.body.type}/${req.body.image}`,
          responseType: "arraybuffer",
        });

        if (data) req.image = data;
        else throw { message: "Error while getting the PNG image!" };
        next();
      } else {
        res.set("Content-Type", "application/pdf");
        res.set("Content-Disposition", `attachment; filename="${pdfFileName}"`);
        return fs.createReadStream(pdfFilePath).pipe(res);
      }
    });
  } catch (error) {
    return res.status(error.response ? error.response.status : 500).json({
      status: "failed",
      message: error.response ? error.response.data.message : error.message,
    });
  }
};
