const express = require("express");
const updateChartsController = require(`${__dirname}/../controllers/updateChartsController`);
const getChartsController = require(`${__dirname}/../controllers/getChartsController`);
const authController = require(`${__dirname}/../controllers/authController`);

const router = express.Router();

router.post("/create", updateChartsController.createUser);

router.patch("/save-chart", updateChartsController.saveChart);

router.get("/num-charts", getChartsController.getNumCharts);

router.get("/user-charts", getChartsController.getUserCharts);

router.post(
  "/download-png",
  authController.protect,
  getChartsController.downloadChart
);

module.exports = router;
