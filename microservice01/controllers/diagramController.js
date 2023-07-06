const axios = require("axios");

/**
 * Create a chart based on the provided configuration.
 *
 * @param {Object} req - The HTTP request object. It contains the chart's type. Its structure is as follows:
 * - type: *chart's type*
 *
 * @param {Object} res - The HTTP response object. Its final structure is as follows:
 * - status: ( *"success"* | *"failed"* )
 * - message: [ *error message* ] (only if an error occurs)
 * - type: *chart's type*
 * - title: *chart's title*
 * - image: *chart's image*
 *
 * @param {Function} next - The callback function to invoke the next middleware.
 *
 * @returns {void} This function does not return a value directly. It sends an HTTP response with the appropriate status code and data/error message.
 *
 * @throws {Error} 400 Bad Request - If there is no chart with the provided type.
 * @throws {Error} 500 Internal Server Error - If something goes wrong while processing the request.
 * @throws {Error} - If the chart service returns an error response.
 */
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
