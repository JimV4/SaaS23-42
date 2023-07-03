const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

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
