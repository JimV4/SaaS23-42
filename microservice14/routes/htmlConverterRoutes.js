const express = require("express");
const htmlConverterController = require("../controllers/htmlConverterController");
const getPNGController = require("../controllers/getPNGController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post(
  "/download",
  authController.protect,
  getPNGController.getPNG,
  htmlConverterController.downloadImageAsHTML
);

module.exports = router;
