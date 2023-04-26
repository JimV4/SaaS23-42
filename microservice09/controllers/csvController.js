const lineChartController = require("./lineChartController");

exports.readCSVFile = async (req, res, next) => {
  try {
    let data = {};

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
      config = lineChartController.getLineChartConfig(data);
      if (!config) {
        return res.status(500).json({
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
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "The file you uploaded contains errors!",
    });
  }
};