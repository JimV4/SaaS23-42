const fs = require("fs");
const sharp = require("sharp");
const potrace = require("potrace");

exports.convertImageToSVG = async (req, res, next) => {
  try {
    if (!req.image) {
      return res.status(400).json({
        status: "failed",
        message: "The requested file does not exist.",
      });
    }

    // Convert the PNG image to a Buffer
    const imageBuffer = Buffer.from(req.image, "base64");

    // Resize the image to a small size for better tracing accuracy
    const resizedImageBuffer = await sharp(imageBuffer)
      .resize(500) // Adjust the desired size as per your requirements
      .toBuffer();

    // Perform tracing using potrace
    const tracedSVG = await traceImage(resizedImageBuffer);

    // Save the SVG to a file
    const svgFileName = `${req.body.image.split(".")[0]}.svg`;
    const svgFilePath = `${__dirname}/../public/${req.body.type}/${svgFileName}`;
    fs.writeFileSync(svgFilePath, tracedSVG);

    // Set the response headers to initiate file download
    res.set("Content-Type", "image/svg+xml");
    res.set("Content-Disposition", `attachment; filename="${svgFileName}"`);
    res.set("Content-Length", tracedSVG.length);

    // Send the response with the SVG file
    fs.createReadStream(svgFilePath).pipe(res);
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong!",
    });
  }
};

// Helper function to perform image tracing using potrace
const traceImage = (imageBuffer, options) => {
  return new Promise((resolve, reject) => {
    const traceOptions = {
      turdSize: 200, // Adjust the turdSize value for better clarity (increase for better results)
      turnPolicy: potrace.Potrace.TURNPOLICY_MAJORITY, // Adjust the turnPolicy for better results
      color: true, // Enable color mode
      threshold: 200, // Adjust the threshold value to control the color range (lower for more colors, higher for fewer colors)
      ...options, // Merge additional options
    };

    potrace.trace(imageBuffer, traceOptions, (err, svg) => {
      if (err) {
        reject(err);
      } else {
        resolve(svg);
      }
    });
  });
};
