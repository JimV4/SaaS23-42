const fs = require("fs");
const potrace = require("potrace");

/**
 * Convert an image file to SVG format.
 *
 * @param {Object} req - The HTTP request object. It contains the chart's type and image. Its structure is as follows:
 * - body: { type, image }
 *
 * @param {Object} res - Τhe HTTP response object. It contains the appropriate status code and error message. Its structure is as follows:
 * - status: ( *"success"* | *"failed"* )
 * - message: ( *message* | *error_message* )
 *
 * @param {Function} next - The callback function to invoke the next middleware.
 *
 * @returns {void} This function does not return a value directly. It sends an HTTP response with the SVG file.
 *
 * @throws {Error} 400 Bad Request - If the requested file does not exist.
 * @throws {Error} 500 Internal Server Error - If an error occurs while converting the image to SVG.
 * @throws {Error} 500 Internal Server Error - If something goes wrong while processing the request.
 */
exports.convertImageToSVG = async (req, res, next) => {
  try {
    if (!req.image) {
      return res.status(400).json({
        status: "failed",
        message: "The requested file does not exist.",
      });
    }

    const imageBuffer = Buffer.from(req.image, "base64");

    const params = {
      background: "#ffffff", // Set a white background for transparent images
      // threshold: 255,
    };

    potrace.posterize(imageBuffer, params, function (err, svg) {
      if (err) {
        return res.status(500).json({
          status: "failed",
          message: err.message,
        });
      }

      // Save the SVG to a file
      const svgFileName = `${req.body.image.split(".")[0]}.svg`;
      const svgFilePath = `${__dirname}/../public/${req.body.type}/${svgFileName}`;
      fs.writeFileSync(svgFilePath, svg);

      // Set the response headers to initiate file download
      res.set("Content-Type", "image/svg+xml");
      res.set("Content-Disposition", `attachment; filename="${svgFileName}"`);

      // Send the response with the SVG file
      fs.createReadStream(svgFilePath).pipe(res);
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};
