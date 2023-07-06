const axios = require("axios");
const FormData = require("form-data");

/**
 * Read a CSV file and extract its contents.
 *
 * @param {Object} req - The HTTP request object. It contains the file's buffer, original name and mime type. Its structure is as follows:
 * - file: { buffer, originalname, mimetype }
 * - config (this is added as a result of the function)
 * - type (this is added as a result of the function)
 * - title (this is added as a result of the function)
 *
 * @param {Object} res - Τhe HTTP response object. It contains the appropriate status code and error message. It is returned only if an error occurs. Its structure is as follows:
 * - status: *"failed"*
 * - message: *error_message*
 *
 * @param {Function} next - The callback function to invoke the next middleware.
 *
 * @returns {void} This function does not return a value directly. It calls the next middleware in the chain or sends an HTTP response with the appropriate status code and error message.
 *
 * @throws {Error} 500 Internal Server Error - If something goes wrong while processing the request.
 * @throws {Error} - If the CSV service returns an error response.
 */
exports.readCSVFile = async (req, res, next) => {
  try {
    const formData = new FormData();
    formData.append("csvFile", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const response = await axios({
      method: "post",
      url: `${process.env.CSV_SERVICE}/readfile`,
      headers: formData.getHeaders(),
      data: formData,
    });

    req.config = response.data.config;
    req.type = response.data.type;
    req.title = response.data.title;
    next();
  } catch (err) {
    if (err.response) {
      return res.status(err.response.status).json({
        status: "failed",
        message: err.response.data.message,
      });
    }
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong!",
    });
  }
};
