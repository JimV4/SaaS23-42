const axios = require("axios");
const undoController = require("../controllers/undoController");

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
    undoController.undoVerifyLogin(req, res, next);

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

exports.checkNumQuotas = async (req, res, next) => {
  try {
    if (!req.free) {
      const response = await axios({
        method: "get",
        url: `${process.env.QUOTAS_SERVICE}/check`,
        data: {
          email: req.email,
          chart_type: req.type,
        },
      });
    }

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

exports.subQuotas = async (req, res, next) => {
  try {
    if (!req.free) {
      const response = await axios({
        method: "patch",
        url: `${process.env.QUOTAS_SERVICE}/sub`,
        data: {
          email: req.email,
          chart_type: req.body.type,
        },
      });
    }
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

exports.addQuotas = async (req, res, next) => {
  try {
    const response = await axios({
      method: "patch",
      url: `${process.env.QUOTAS_SERVICE}/add`,
      data: {
        email: req.email,
        quotas: req.body.quotas,
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
