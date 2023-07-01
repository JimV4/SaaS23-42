const express = require("express");
const quotasController = require("../controllers/quotasController");
const authController = require("../controllers/authController");

const router = express.Router();

router.patch("/purchase", authController.protect, quotasController.addQuotas);

module.exports = router;
