const express = require("express");
const htmlConverterController = require("../controllers/htmlConverterController");
const getPNGController = require("../controllers/getPNGController");

const router = express.Router();

router.get(
  "/download",
  getPNGController.getPNG,
  htmlConverterController.downloadImageAsHTML
);

module.exports = router;
