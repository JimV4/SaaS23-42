const express = require("express");
const converterController = require("../controllers/converterController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post(
  "/download-pdf",
  authController.protect,
  converterController.downloadPDF
);

module.exports = router;
