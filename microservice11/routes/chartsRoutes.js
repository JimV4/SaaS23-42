const express = require("express");
const multer = require("multer");
const updateChartsController = require("../controllers/updateChartsController");
const getChartsController = require("../controllers/getChartsController");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/create", updateChartsController.createUser);

router.patch(
  "/save-chart",
  upload.single("image"),
  updateChartsController.saveChart
);

router.delete("/delete-chart", updateChartsController.deleteChart);

router.get("/num-charts", getChartsController.getNumCharts);

module.exports = router;
