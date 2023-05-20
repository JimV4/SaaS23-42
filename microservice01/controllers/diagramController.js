const axios = require("axios");

exports.createChart = async (req, res, next) => {
  try {
    let service;
    if (req.type == "line-chart") service = process.env.LINE_CHART_SERVICE;
    else if (req.type == "multi-axis-line-chart")
      service = process.env.MULTI_AXIS_LINE_CHART_SERVICE;
    else if (req.type == "radar-chart")
      service = process.env.RADAR_CHART_SERVICE;
    else if (req.type == "scatter-chart")
      service = process.env.SCATTER_CHART_SERVICE;
    else if (req.type == "bubble-chart")
      service = process.env.BUBBLE_CHART_SERVICE;
    else if (req.type == "polar-area-chart")
      service = process.env.POLAR_AREA_CHART_SERVICE;
    else {
      return res.status(400).json({
        status: "failed",
        message: "There is no chart with this type!",
      });
    }

    const response = await axios({
      method: "post",
      url: `${service}/create`,
      data: req.config,
    });

    const jsonResponse = {
      status: "success",
      type: req.type,
      title: req.title,
      image: response.data.image,
    };

    return res.status(200).json(jsonResponse);
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
