const axios = require("axios");

/**
 * Middleware function to protect routes by verifying the user's authentication token.
 *
 * @param {Object} req - The HTTP request object. It contains the authorization header and the jwt cookie. Its structure is as follows:
 * - headers: { authorization }
 * - cookies: { jwt }
 * - email: *email_address* (as a result of the function, this is added)
 *
 * @param {Object} res - Τhe HTTP response object. It contains the appropriate status code and error message. It is returned only if an error occurs. Its structure is as follows:
 * - status: *"failed"*
 * - message: *error_message*
 *
 * @param {Function} next - The callback function to invoke the next middleware.
 *
 * @returns {void} This function does not return a value directly. It either calls the next middleware or sends an HTTP response with the appropriate status code and message.
 *
 * @throws {Error} 401 Unauthorized - If the authentication token is missing or invalid.
 * @throws {Error} 500 Internal Server Error - If something goes wrong while processing the request.
 */
exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt && req.cookies.jwt != "loggedout")
      token = req.cookies.jwt;

    const response = await axios({
      method: "get",
      url: `${process.env.LOGIN_SERVICE}/google/checklogin`,
      headers: {
        Cookie: token ? `jwt=${token}` : "jwt=",
      },
    });

    req.email = response.data.email;
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
