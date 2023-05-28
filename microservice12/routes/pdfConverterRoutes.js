const express = require("express");
const pdfConverterController = require("../controllers/pdfConverterController");
const getPNGController = require("../controllers/getPNGController");

const router = express.Router();

router.get(
  "/download",
  getPNGController.getPNG,
  pdfConverterController.downloadImageAsPDF
);

module.exports = router;
