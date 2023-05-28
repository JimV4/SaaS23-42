const axios = require("axios");

exports.getPNG = async (req, res, next) => {
  try {
    if (!req.body.type || !req.body.image) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide the type and the name of the PNG file!",
      });
    }

    const response = await axios({
      method: "get",
      url: `${process.env.STORED_CHARTS_SERVICE}/${req.body.type}/${req.body.image}`,
      responseType: "arraybuffer",
    });

    req.image = response.data;
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
