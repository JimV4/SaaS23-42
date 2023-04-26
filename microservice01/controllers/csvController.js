const axios = require("axios");
const FormData = require("form-data");

exports.readCSVFile = async (req, res, next) => {
  try {
    const formData = new FormData();
    formData.append("csvFile", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const response = await axios({
      method: "post",
      url: `${process.env.CSV_SERVICE}/readfile`,
      headers: formData.getHeaders(),
      data: formData,
    });

    req.config = response.data.config;
    next();
  } catch (err) {
    if (err.response) {
      return res.status(err.response.status).json({
        status: "failed",
        message: err.response.data.message,
      });
    }
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};
