const express = require("express");
const svgConverterController = require(`${__dirname}/../controllers/svgConverterController`);
const getPNGController = require(`${__dirname}/../controllers/getPNGController`);
const authController = require(`${__dirname}/../controllers/authController`);

const router = express.Router();

router.post(
  "/download",
  authController.protect,
  getPNGController.getPNG,
  svgConverterController.convertImageToSVG
);

module.exports = router;
