const axios = require("axios");

exports.createUser = async (req, res, next) => {
  try {
    const response = await axios({
      method: "post",
      url: `${process.env.QUOTAS_SERVICE}/create`,
      data: {
        email: req.data.email,
      },
    });

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

exports.checkNumQuotas = async (req, res, next) => {
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.QUOTAS_SERVICE}/check`,
      data: {
        email: req.email,
        chart_type: req.type,
      },
    });

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

exports.subQuotas = async (req, res, next) => {
  try {
    const response = await axios({
      method: "patch",
      url: `${process.env.QUOTAS_SERVICE}/sub`,
      data: {
        email: req.email,
        chart_type: req.body.type,
      },
    });

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

exports.getNumQuotas = async (req, res, next) => {
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.QUOTAS_SERVICE}/num-quotas`,
      data: {
        email: req.email,
      },
    });

    req.quotas = response.data.data;
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
