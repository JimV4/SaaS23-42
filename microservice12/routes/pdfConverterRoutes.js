const express = require("express");
const pdfConverterController = require(`${__dirname}/../controllers/pdfConverterController`);
const getPNGController = require(`${__dirname}/../controllers/getPNGController`);
const authController = require(`${__dirname}/../controllers/authController`);

const router = express.Router();

router.post(
  "/download",
  authController.protect,
  getPNGController.getPNG,
  pdfConverterController.downloadImageAsPDF
);

module.exports = router;
