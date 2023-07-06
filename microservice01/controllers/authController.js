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

exports.verifyLogin = async (req, res, next) => {
  try {
    if (!req.params.userID) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide the userID.",
      });
    }

    const response = await axios({
      method: "patch",
      url: `${process.env.LOGIN_SERVICE}/verifylogin/${req.params.userID}`,
    });

    req.data = response.data;

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

exports.cancelLogin = async (req, res, next) => {
  try {
    if (!req.params.userID) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide the userID.",
      });
    }

    const response = await axios({
      method: "delete",
      url: `${process.env.LOGIN_SERVICE}/cancellogin/${req.params.userID}`,
    });

    return res.status(response.status).json(response.data);
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

exports.GoogleCallback = async (req, res, next) => {
  try {
    const response = await axios({
      method: "post",
      url: `${process.env.LOGIN_SERVICE}/google/callback`,
      data: {
        email: req.body.email ? req.body.email : null,
        name: req.body.name ? req.body.name : null,
      },
    });

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    res.cookie("jwt", response.data.token, cookieOptions);

    return res.status(response.status).json(response.data);
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

exports.GoogleLogout = (req, res, next) => {
  try {
    res.cookie("jwt", "loggedout", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    res.status(200).json({ status: "success" });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong!",
    });
  }
};

exports.getLastLogin = async (req, res, next) => {
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.LOGIN_SERVICE}/google/last-login`,
      data: {
        email: req.email,
      },
    });

    req.lastLogin = response.data.data;
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
