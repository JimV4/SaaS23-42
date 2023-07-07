const express = require("express");
const quotasController = require(`${__dirname}/../controllers/quotasController`);
const authController = require(`${__dirname}/../controllers/authController`);

const router = express.Router();

router.patch("/purchase", authController.protect, quotasController.addQuotas);

module.exports = router;
