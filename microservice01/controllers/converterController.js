const axios = require("axios");

function convertToSlug(string) {
  return string.toLowerCase().replace(/\s+/g, "_");
}

exports.downloadPDF = async (req, res, next) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide the title of the chart!",
      });
    }

    const response = await axios({
      method: "post",
      url: `${process.env.PDF_SERVICE}/download`,
      data: {
        imageURL: req.body.imageURL,
      },
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${convertToSlug(req.body.title)}.pdf`
    );

    res.send(Buffer.from(response.data.pdf, "base64"));
  } catch (err) {
    if (err.response) {
      console.log("re");
      return res.status(err.response.status).json({
        status: "failed",
        message: err.response.data.message,
      });
    }
    console.log("error");
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};
