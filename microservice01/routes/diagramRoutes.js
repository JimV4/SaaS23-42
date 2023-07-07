const express = require("express");
const multer = require("multer");
const diagramController = require(`${__dirname}/../controllers/diagramController`);
const authController = require(`${__dirname}/../controllers/authController`);
const csvController = require(`${__dirname}/../controllers/csvController`);
const quotasController = require(`${__dirname}/../controllers/quotasController`);
const storedChartsController = require(`${__dirname}/../controllers/storedChartsController`);

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
