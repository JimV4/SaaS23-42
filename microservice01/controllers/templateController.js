exports.downloadTemplate = (req, res, next) => {
  try {
    let file;
    if (req.params.diagram == "line-chart") {
      file = `${__dirname}/../csvTemplates/line-chart-template.txt`;
    } else if (req.params.diagram == "multi-axis-line-chart") {
      file = `${__dirname}/../csvTemplates/multi-axis-line-chart-template.txt`;
    } else if (req.params.diagram == "radar-chart") {
      file = `${__dirname}/../csvTemplates/radar-chart-template.txt`;
    } else if (req.params.diagram == "scatter-chart") {
      file = `${__dirname}/../csvTemplates/scatter-chart-template.txt`;
    } else if (req.params.diagram == "bubble-chart") {
      file = `${__dirname}/../csvTemplates/bubble-chart-template.txt`;
    } else if (req.params.diagram == "polar-area-chart") {
      file = `${__dirname}/../csvTemplates/polar-area-chart-template.txt`;
    } else {
      return res.status(400).json({
        status: "failed",
        message: "Please provide a supported chart type as a parameter.",
      });
    }

    res.set("Content-Type", "application/json");
    res.set(
      "X-Data",
      JSON.stringify({
        status: "success",
        message: "The CSV template was successfully sent!",
      })
    );

    res.download(file);
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong!",
    });
  }
};
