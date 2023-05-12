const express = require("express");
const updateQuotasController = require("../controllers/updateQuotasController");
const getQuotasController = require("../controllers/getQuotasController");

const router = express.Router();

router.post("/create", updateQuotasController.createUser);

router.get("/check", getQuotasController.checkNumQuotas);

router.patch("/sub", updateQuotasController.subQuotas);

module.exports = router;
