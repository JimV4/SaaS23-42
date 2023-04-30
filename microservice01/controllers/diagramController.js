const axios = require("axios");

exports.createChart = async (req, res, next) => {
  try {
    let service;
    if (req.type == "line-chart") service = process.env.LINE_CHART_SERVICE;
    else if (req.type == "multi-axis-line-chart")
      service = process.env.MULTI_AXIS_LINE_CHART_SERVICE;
    else if (req.type == "radar-chart")
      service = process.env.RADAR_CHART_SERVICE;
    else {
      return res.status(400).json({
        status: "failed",
        message: "There is no chart with this type!",
      });
    }

    const response = await axios({
      method: "post",
      url: `${service}/create`,
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
