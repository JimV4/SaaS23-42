const axios = require("axios");

exports.createLineChart = async (req, res, next) => {
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.LINE_CHART_SERVICE}/create`,
      responseType: "arraybuffer",
    });

    const image = Buffer.from(response.data, "binary");

    res.writeHead(200, {
      "Content-Type": "image/png",
    });

    res.end(image);
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
