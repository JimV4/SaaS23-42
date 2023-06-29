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
  return res.status(418).json({ message: "I'm a teapot" });
  next();
};
