const express = require("express");
const htmlConverterController = require(`${__dirname}/../controllers/htmlConverterController`);
const getPNGController = require(`${__dirname}/../controllers/getPNGController`);
const authController = require(`${__dirname}/../controllers/authController`);

const router = express.Router();

router.post(
  "/download",
  authController.protect,
  getPNGController.getPNG,
  htmlConverterController.downloadImageAsHTML
);

module.exports = router;
