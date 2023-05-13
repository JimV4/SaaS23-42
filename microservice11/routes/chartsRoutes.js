const express = require("express");
const updateChartsController = require("../controllers/updateChartsController");

const router = express.Router();

router.post("/create", updateChartsController.createUser);

router.patch("/save-chart", updateChartsController.saveChart);

router.delete("/delete-chart", updateChartsController.deleteChart);

module.exports = router;
