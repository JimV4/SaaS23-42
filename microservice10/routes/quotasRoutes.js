const express = require("express");
const updateQuotasController = require("../controllers/updateQuotasController");

const router = express.Router();

router.post("/create", updateQuotasController.createUser);

module.exports = router;
