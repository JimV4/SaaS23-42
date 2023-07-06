/**
 * Download a CSV template for a specific chart type.
 *
 * @param {Object} req - The HTTP request object. It contains the type of the diagram. Its struture is as follows:
 * - params: { diagram }
 *
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The callback function to invoke the next middleware.
 *
 * @returns {void} This function does not return a value directly. It sends an HTTP response with the appropriate status code and the CSV file or an error message.
 *
 * @throws {Error} 400 Bad Request - If the provided chart type is not supported.
 * @throws {Error} 500 Internal Server Error - If something goes wrong while processing the request.
 */
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
