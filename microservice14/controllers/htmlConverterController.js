const fs = require("fs");

/**
 * Creates the HTML file from the PNG image and sends it to the user.
 * @param {JSON} req - JSON object containing a body with
 * @param {JSON} res - JSON object containing a confirmation/rejection of the request.
 * @param {Function} next - Pointer to the next function in the middleware stack.
 * @returns
 * The function returns a read stream for the HTML file to be sent to the user or,
 * if an error has occurred, an object with the fields below:
 * - status: "failed",
 * - message: <error message>
 *
 * URL: {baseURL}/html-converter/download
 */
exports.downloadImageAsHTML = async (req, res, next) => {
  return res.status(418).json({ message: "I'm a teapot." });
  next();
};
