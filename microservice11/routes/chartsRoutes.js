const express = require("express");
const updateChartsController = require("../controllers/updateChartsController");

const router = express.Router();

router.post("/create", updateChartsController.createUser);

module.exports = router;
