const express = require("express");
const multer = require("multer");
const diagramController = require("../controllers/diagramController");
const authController = require("../controllers/authController");
const csvController = require("../controllers/csvController");

const router = express.Router();

const storage = multer.memoryStorage(); // Use memory storage
const upload = multer({ storage }); // Configure multer with storage

router.post(
  "/create/line-chart",
  // authController.protect,
  upload.single("csvFile"),
  csvController.readCSVFile,
  diagramController.createLineChart
);

module.exports = router;
