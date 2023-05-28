const express = require("express");
const updateChartsController = require("../controllers/updateChartsController");
const getChartsController = require("../controllers/getChartsController");

const router = express.Router();

router.post("/create", updateChartsController.createUser);

router.patch("/save-chart", updateChartsController.saveChart);

router.get("/num-charts", getChartsController.getNumCharts);

router.get("/user-charts", getChartsController.getUserCharts);

router.get("/download-png", getChartsController.downloadChart);

module.exports = router;
