const express = require("express");
const svgConverterController = require("../controllers/svgConverterController");
const getPNGController = require("../controllers/getPNGController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post(
  "/download",
  authController.protect,
  getPNGController.getPNG,
  svgConverterController.convertImageToSVG
);

module.exports = router;
