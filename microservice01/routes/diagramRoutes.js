const express = require("express");
const multer = require("multer");
const diagramController = require("../controllers/diagramController");
const authController = require("../controllers/authController");
const csvController = require("../controllers/csvController");
const quotasController = require("../controllers/quotasController");
const storedChartsController = require("../controllers/storedChartsController");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/create",
  authController.protect,
  upload.single("csvFile"),
  csvController.readCSVFile,
  storedChartsController.checkNumCharts,
  quotasController.checkNumQuotas,
  diagramController.createChart
);

router.patch(
  "/save-chart",
  authController.protect,
  storedChartsController.checkNumCharts,
  quotasController.subQuotas,
  storedChartsController.saveChart
);

router.get(
  "/my-charts",
  authController.protect,
  storedChartsController.getUserCharts
);

module.exports = router;
