const express = require("express");
const pdfConverterController = require("../controllers/pdfConverterController");
const getPNGController = require("../controllers/getPNGController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post(
  "/download",
  authController.protect,
  getPNGController.getPNG,
  pdfConverterController.downloadImageAsPDF
);

module.exports = router;
