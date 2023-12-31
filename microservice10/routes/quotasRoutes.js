const express = require("express");
const updateQuotasController = require(`${__dirname}/../controllers/updateQuotasController`);
const getQuotasController = require(`${__dirname}/../controllers/getQuotasController`);

const router = express.Router();

router.post("/create", updateQuotasController.createUser);

router.delete("/undocreate", updateQuotasController.undoCreateUser);

router.get("/check", getQuotasController.checkNumQuotas);

router.patch("/sub", updateQuotasController.subQuotas);

router.patch("/undosub", updateQuotasController.undoSubQuotas);

router.patch("/add", updateQuotasController.addQuotas);

router.get("/num-quotas", getQuotasController.getNumQuotas);

module.exports = router;
