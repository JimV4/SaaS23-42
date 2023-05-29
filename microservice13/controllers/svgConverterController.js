const fs = require("fs");
const potrace = require("potrace");

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
