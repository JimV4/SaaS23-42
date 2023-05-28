const { PDFDocument, PDFImage } = require("pdf-lib");
const fs = require("fs");

exports.downloadImageAsPDF = async (req, res, next) => {
  try {
    if (!req.image) {
      return res.status(400).json({
        status: "failed",
        message: "The requested file does not exist.",
      });
    }

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    // Convert the req.image to a PDFImage object
    const pdfImage = await pdfDoc.embedPng(req.image);

    // Get the dimensions of the PDFImage
    const imageWidth = pdfImage.width;
    const imageHeight = pdfImage.height;

    // Calculate the scaled dimensions while maintaining the aspect ratio
    const pageWidth = page.getWidth();
    const pageHeight = page.getHeight();
    const scaleFactor = Math.min(
      pageWidth / imageWidth,
      pageHeight / imageHeight
    );
    const scaledWidth = imageWidth * scaleFactor;
    const scaledHeight = imageHeight * scaleFactor;

    // Calculate the positioning to center the image on the page
    const x = (pageWidth - scaledWidth) / 2;
    const y = (pageHeight - scaledHeight) / 2;

    // Draw the image on the PDF page with adjusted dimensions
    page.drawImage(pdfImage, {
      x,
      y,
      width: scaledWidth,
      height: scaledHeight,
    });

    // Save the PDF to a file
    const pdfBytes = await pdfDoc.save();
    const pdfFileName = `${req.body.image.split(".")[0]}.pdf`;
    const pdfFilePath = `${__dirname}/../public/${req.body.type}/${pdfFileName}`;
    fs.writeFileSync(pdfFilePath, pdfBytes);

    // Set the response headers to initiate file download
    res.set("Content-Type", "application/pdf");
    res.set("Content-Disposition", `attachment; filename="${pdfFileName}"`);
    res.set("Content-Length", pdfBytes.length);

    // Send the response with the PDF file
    fs.createReadStream(pdfFilePath).pipe(res);
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong!",
    });
  }
};
