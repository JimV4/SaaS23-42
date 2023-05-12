const axios = require("axios");

exports.createUser = async (req, res, next) => {
  try {
    const response = await axios({
      method: "post",
      url: `${process.env.STORED_CHARTS_SERVICE}/create`,
      data: {
        email: req.data.email,
      },
    });

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    res.cookie("jwt", req.data.token, cookieOptions);

    req.data.email = undefined;

    return res.status(response.status).json(req.data);
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

exports.saveChart = async (req, res, next) => {
  try {
    const response = await axios({
      method: "patch",
      url: `${process.env.STORED_CHARTS_SERVICE}/save-chart`,
      data: {
        email: req.email,
        path: req.body.path,
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
      message: "Something went wrong!",
    });
  }
};
