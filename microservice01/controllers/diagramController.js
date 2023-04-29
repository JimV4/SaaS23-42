const axios = require("axios");

exports.createChart = async (req, res, next) => {
  if (req.type == "line-chart") createLineChart(req, res, next);
};

const createLineChart = async (req, res, next) => {
  try {
    const response = await axios({
      method: "post",
      url: `${process.env.LINE_CHART_SERVICE}/create`,
      responseType: "arraybuffer",
      data: req.config,
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
