const express = require("express");
const pdfConverterController = require("../controllers/pdfConverterController");

const router = express.Router();

router.post("/download", pdfConverterController.downloadImageAsPDF);

module.exports = router;
