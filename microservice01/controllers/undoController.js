const axios = require("axios");

exports.undoVerifyLogin = async (req, res, next) => {
  try {
    if (!req.params.userID) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide the userID.",
      });
    }

    const response = await axios({
      method: "patch",
      url: `${process.env.LOGIN_SERVICE}/undoverifylogin/${req.params.userID}`,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong causing inconstistencies!",
    });
  }
};

exports.undoCreateUser = async (req, res, next) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${process.env.QUOTAS_SERVICE}/undocreate`,
      data: {
        email: req.data.email,
      },
    });

    next();
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong causing inconstintencies!",
    });
  }
};
