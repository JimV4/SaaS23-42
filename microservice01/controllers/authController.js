const axios = require("axios");

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

    // const cookieOptions = {
    //   expires: new Date(
    //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    //   ),
    //   httpOnly: true,
    //   path: "/",
    // };

    // res.cookie("jwt", response.data.token, cookieOptions);
    res.setHeader(
      "Set-Cookie",
      `jwt=${response.data.token}; HttpOnly; Expires=${new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      )}; Path='/'`
    );

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

exports.GoogleLogout = (req, res, next) => {
  try {
    // res.cookie("jwt", "loggedout", {
    //   expires: new Date(Date.now() + 10 * 1000),
    //   httpOnly: true,
    //   path: "/",
    // });

    res.setHeader(
      "Set-Cookie",
      `jwt=loggedout; HttpOnly; Expires=${new Date(
        Date.now() + 10 * 1000
      )}; Path='/'`
    );

    res.status(200).json({ status: "success" });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};
