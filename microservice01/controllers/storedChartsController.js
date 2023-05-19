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
    const formData = new FormData();
    const fileBlob = new Blob([req.file.buffer], { type: req.file.mimetype });

    formData.append("image", fileBlob, req.file.originalname);
    formData.set("type", req.body.type);
    formData.set("title", req.body.title);
    formData.set("email", req.email);

    const response = await axios({
      method: "patch",
      url: `${process.env.STORED_CHARTS_SERVICE}/save-chart`,
      data: formData,
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

exports.getNumCharts = async (req, res, next) => {
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.STORED_CHARTS_SERVICE}/num-charts`,
      data: {
        email: req.email,
      },
    });

    req.charts = response.data.data;
    return res.status(200).json({
      status: "success",
      email: req.email,
      lastLogin: req.lastLogin,
      quotas: req.quotas,
      charts: req.charts,
    });
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
