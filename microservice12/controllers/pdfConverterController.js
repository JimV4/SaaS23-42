const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const PDFDocument = require("pdfkit");

function convertToSlug(string) {
  return string.toLowerCase().replace(/\s+/g, "_");
}

exports.downloadImageAsPDF = (req, res, next) => {
  if (!req.body.imageURL || !req.body.title) {
    return res.status(400).json({
      status: "failed",
      message: "Please provide the title of the chart and the imageURL!",
    });
  }
  const imageURL = req.body.imageURL;
  // Extract the base64-encoded image data from the URL
  const base64Data = imageURL.replace(/^data:image\/png;base64,/, "");

  // Create a PDF document with higher DPI for better image quality
  const doc = new PDFDocument({ dpi: 300 });

  // Create a buffer to store the PDF content
  const chunks = [];
  doc.on("data", (chunk) => chunks.push(chunk));
  doc.on("end", () => {
    // Concatenate all chunks into a single buffer
    const pdfBuffer = Buffer.concat(chunks);

    // Stream the PDF buffer to the response
    res.status(200).json({
      status: "success",
      pdf: pdfBuffer.toString("base64"),
    });
  });

  // Pipe the PDF document to the buffer
  doc.pipe(fs.createWriteStream("temp.pdf"));

  // Create a canvas and load the image
  const canvas = createCanvas();
  const ctx = canvas.getContext("2d");

  loadImage(Buffer.from(base64Data, "base64"))
    .then((image) => {
      // Set the canvas dimensions to match the image
      canvas.width = image.width;
      canvas.height = image.height;

      // Calculate the image dimensions to fit within the PDF page
      const pageWidth =
        doc.page.width - doc.page.margins.left - doc.page.margins.right;
      const pageHeight =
        doc.page.height - doc.page.margins.top - doc.page.margins.bottom;

      let imageWidth = image.width;
      let imageHeight = image.height;

      if (imageWidth > pageWidth) {
        const scaleFactor = pageWidth / imageWidth;
        imageWidth *= scaleFactor;
        imageHeight *= scaleFactor;
      }

      if (imageHeight > pageHeight) {
        const scaleFactor = pageHeight / imageHeight;
        imageWidth *= scaleFactor;
        imageHeight *= scaleFactor;
      }

      // Calculate the position to center the image on the PDF page
      const x = (pageWidth - imageWidth) / 2 + doc.page.margins.left;
      const y = (pageHeight - imageHeight) / 2 + doc.page.margins.top;

      // Draw the image on the canvas
      ctx.drawImage(image, x, y, imageWidth, imageHeight);

      // Convert the canvas to a buffer
      const buffer = canvas.toBuffer("image/png");

      // Embed the image in the PDF
      doc.image(buffer, 0, 0);

      // End the PDF generation
      doc.end();
    })
    .catch((err) => {
      console.error("Error loading image:", err);
      res.status(500).json({
        status: "failed",
        message: "Something went wrong!",
      });
    });
};
