const express = require("express");
const authController = require(`${__dirname}/../controllers/authController`);
const getPNGController = require(`${__dirname}/../controllers/getPNGController`);
const svgConverterController = require(`${__dirname}/../controllers/svgConverterController`);

const router = express.Router();

router.post(
  "/download",
  authController.protect,
  getPNGController.getPNG,
  svgConverterController.downloadImageAsSVG
);

module.exports = router;
