const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

/**
 * Download an image as an HTML file.
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
 * @returns {void} This function does not return a value directly. It sends an HTTP response with the HTML file.
 *
 * @throws {Error} 400 Bad Request - If the requested file does not exist.
 * @throws {Error} 500 Internal Server Error - If something goes wrong while processing the request.
 */
exports.downloadImageAsHTML = async (req, res, next) => {
  try {
    if (!req.image) {
      return res.status(400).json({
        status: "failed",
        message: "The requested file does not exist.",
      });
    }

    // Load the PNG image using the 'canvas' library
    const image = await loadImage(req.image);
    const { width, height } = image;

    // Create a canvas with the same dimensions as the image
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Draw the image onto the canvas
    ctx.drawImage(image, 0, 0, width, height);

    // Convert the canvas to an HTML string
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Image to HTML</title>
        <style>
          body {
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        <img src="${canvas.toDataURL()}">
      </body>
      </html>
    `;

    // Save the HTML string to a file
    const htmlFileName = `${req.body.image.split(".")[0]}.html`;
    const htmlFilePath = `${__dirname}/../public/${req.body.type}/${htmlFileName}`;
    fs.writeFileSync(htmlFilePath, html);

    // Set the response headers to initiate file download
    res.set("Content-Type", "text/html");
    res.set("Content-Disposition", `attachment; filename="${htmlFileName}"`);
    res.set("Content-Length", Buffer.byteLength(html));

    // Send the response with the HTML file
    res.send(html);
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong!",
    });
  }
};
