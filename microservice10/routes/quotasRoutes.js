const express = require("express");
const updateQuotasController = require("../controllers/updateQuotasController");
const getQuotasController = require("../controllers/getQuotasController");

const router = express.Router();

router.post("/create", updateQuotasController.createUser);

router.get("/check", getQuotasController.checkNumQuotas);

router.patch("/sub", updateQuotasController.subQuotas);

router.patch("/add", updateQuotasController.addQuotas);

router.get("/num-quotas", getQuotasController.getNumQuotas);

module.exports = router;
