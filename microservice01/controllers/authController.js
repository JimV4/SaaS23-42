const axios = require("axios");

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) token = req.cookies.jwt;

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
      message: err.message,
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
      message: err.message,
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
      message: err.message,
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
      message: err.message,
    });
  }
};

exports.GoogleLogout = async (req, res, next) => {
  try {
    const response = await axios({
      method: "post",
      url: `${process.env.LOGIN_SERVICE}/google/logout`,
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
      message: err.message,
    });
  }
};
