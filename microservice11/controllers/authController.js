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
      message: "Something went wrong!",
    });
  }
};
