const lineChartController = require("./lineChartController");
const multiAxisLineChartController = require("./multiAxisLineChartController");
const radarChartController = require("./radarChartController");
const scatterChartController = require("./scatterChartController");
const bubbleChartController = require("./bubbleChartController");
const polarAreaChartController = require("./polarAreaChartController");

exports.readCSVFile = async (req, res, next) => {
  try {
    let data = {};
    let type;

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
    } else if (data["type"] == "multi-axis-line-chart") {
      type = "multi-axis-line-chart";
      config = multiAxisLineChartController.getMultiAxisLineChartConfig(data);
      if (!config) {
        return res.status(400).json({
          status: "failed",
          message: "The file you uploaded contains errors!",
        });
      }
    } else if (data["type"] == "radar-chart") {
      type = "radar-chart";
      config = radarChartController.getRadarChartConfig(data);
      if (!config) {
        return res.status(400).json({
          status: "failed",
          message: "The file you uploaded contains errors!",
        });
      }
    } else if (data["type"] == "scatter-chart") {
      type = "scatter-chart";
      config = scatterChartController.getScatterChartConfig(data);
      if (!config) {
        return res.status(400).json({
          status: "failed",
          message: "The file you uploaded contains errors!",
        });
      }
    } else if (data["type"] == "bubble-chart") {
      type = "bubble-chart";
      config = bubbleChartController.getBubbleChartConfig(data);
      if (!config) {
        return res.status(400).json({
          status: "failed",
          message: "The file you uploaded contains errors!",
        });
      }
    } else if (data["type"] == "polar-area-chart") {
      type = "polar-area-chart";
      config = polarAreaChartController.getPolarAreaChartConfig(data);
      if (!config) {
        return res.status(400).json({
          status: "failed",
          message: "The file you uploaded contains errors!",
        });
      }
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
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "The file you uploaded contains errors!",
    });
  }
};
