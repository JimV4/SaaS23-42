const express = require("express");
const multer = require("multer");
const diagramController = require("../controllers/diagramController");
const authController = require("../controllers/authController");
const csvController = require("../controllers/csvController");
const quotasController = require("../controllers/quotasController");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/create/:chart_type",
  authController.protect,
  upload.single("csvFile"),
  quotasController.checkNumQuotas,
  csvController.readCSVFile,
  diagramController.createChart
);

module.exports = router;
