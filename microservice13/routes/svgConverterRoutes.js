const express = require("express");
const svgConverterController = require("../controllers/svgConverterController");
const getPNGController = require("../controllers/getPNGController");

const router = express.Router();

router.get(
  "/download",
  getPNGController.getPNG,
  svgConverterController.convertImageToSVG
);

module.exports = router;
