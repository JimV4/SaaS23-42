const express = require("express");
const authController = require(`${__dirname}/../controllers/authController`);
const getPNGController = require(`${__dirname}/../controllers/getPNGController`);
const htmlConverterController = require(`${__dirname}/../controllers/htmlConverterController`);

const router = express.Router();

router.post(
  "/download",
  authController.protect,
  getPNGController.getPNG,
  htmlConverterController.downloadImageAsHTML
);

module.exports = router;
