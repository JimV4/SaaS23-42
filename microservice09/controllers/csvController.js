const lineChartController = require(`${__dirname}/lineChartController`);
const multiAxisLineChartController = require(`${__dirname}/multiAxisLineChartController`);
const radarChartController = require(`${__dirname}/radarChartController`);
const scatterChartController = require(`${__dirname}/scatterChartController`);
const bubbleChartController = require(`${__dirname}/bubbleChartController`);
const polarAreaChartController = require(`${__dirname}/polarAreaChartController`);

/**
 * Read and process a CSV file to generate a chart configuration.
 *
 * @param {Object} req - The HTTP request object. It contains the chart's type and title, and the file. Its structure is as follows:
 * - file
 * - config
 * - type
 * - title
 *
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The callback function to invoke the next middleware.
 *
 * @returns {void} This function does not return a value directly. It sends an HTTP response with the appropriate status code and message.
 *
 * @throws {Error} 400 Bad Request - If no CSV file is uploaded or the chart type does not match any of the provided charts.
 * @throws {Error} 500 Internal Server Error - If the file contains errors or something goes wrong while processing the request.
 */
exports.readCSVFile = async (req, res, next) => {
  try {
    let data = {};
    let type;
    let title;

    if (!req.file) {
      return res.status(400).json({
        status: "failed",
        message: "Please upload a CSV file.",
      });
    }

    const csvData = req.file.buffer.toString();
    const lines = csvData.split("\n");

    for (let i = 0; i < lines.length - 1; i++) {
      let line = lines[i].split(":");
      if (line.length != 1)
        data[line[0]] = line[1].split("\r")[0].split("\t")[0];
    }

    if (!data["type"]) {
      return res.status(400).json({
        status: "failed",
        message:
          "The type of the chart does not match any of the provided charts!",
      });
    } else if (data["type"] == "line-chart") {
      type = "line-chart";
      config = lineChartController.getLineChartConfig(data);
      if (!config) {
        return res.status(400).json({
          status: "failed",
          message: "The file you uploaded contains errors!",
        });
      }
      title = config.title ? config.title : "Line chart";
    } else if (data["type"] == "multi-axis-line-chart") {
      type = "multi-axis-line-chart";
      config = multiAxisLineChartController.getMultiAxisLineChartConfig(data);
      if (!config) {
        return res.status(400).json({
          status: "failed",
          message: "The file you uploaded contains errors!",
        });
      }
      title = config.title ? config.title : "Multi axis line chart";
    } else if (data["type"] == "radar-chart") {
      type = "radar-chart";
      config = radarChartController.getRadarChartConfig(data);
      if (!config) {
        return res.status(400).json({
          status: "failed",
          message: "The file you uploaded contains errors!",
        });
      }
      title = config.title ? config.title : "Radar chart";
    } else if (data["type"] == "scatter-chart") {
      type = "scatter-chart";
      config = scatterChartController.getScatterChartConfig(data);
      if (!config) {
        return res.status(400).json({
          status: "failed",
          message: "The file you uploaded contains errors!",
        });
      }
      title = config.title ? config.title : "Scatter chart";
    } else if (data["type"] == "bubble-chart") {
      type = "bubble-chart";
      config = bubbleChartController.getBubbleChartConfig(data);
      if (!config) {
        return res.status(400).json({
          status: "failed",
          message: "The file you uploaded contains errors!",
        });
      }
      title = config.title ? config.title : "Bubble chart";
    } else if (data["type"] == "polar-area-chart") {
      type = "polar-area-chart";
      config = polarAreaChartController.getPolarAreaChartConfig(data);
      if (!config) {
        return res.status(400).json({
          status: "failed",
          message: "The file you uploaded contains errors!",
        });
      }
      title = config.title ? config.title : "Polar area chart";
    } else {
      return res.status(400).json({
        status: "failed",
        message:
          "The type of the chart does not match any of the provided charts!",
      });
    }

    res.status(200).json({
      status: "success",
      config,
      type,
      title,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "The file you uploaded contains errors!",
    });
  }
};
