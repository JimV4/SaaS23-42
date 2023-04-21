const express = require("express");
const diagramController = require("../controllers/diagramController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get(
  "/create/line-chart",
  authController.protect,
  diagramController.createLineChart
);

module.exports = router;
