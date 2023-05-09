exports.downloadTemplate = (req, res, next) => {
  try {
    let file;
    if (req.params.diagram == "line-chart") {
      file = `${__dirname}/../csvTemplates.line_chart_template.txt`;
    } else if (req.params.diagram == "multi-axis-line-chart") {
      file = `${__dirname}/../csvTemplates.multi_axis_line_chart_template.txt`;
    } else if (req.params.diagram == "radar-chart") {
      file = `${__dirname}/../csvTemplates.radar_chart_template.txt`;
    } else {
      return res.status(400).json({
        status: "failed",
        message: "Please provide a supported chart type as a parameter.",
      });
    }

    res.download(file);
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong!",
    });
  }
};
