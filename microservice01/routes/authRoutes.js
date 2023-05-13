const express = require("express");
const authController = require("../controllers/authController");
const quotasController = require("../controllers/quotasController");
const storedChartsController = require("../controllers/storedChartsController");

const router = express.Router();

router.post("/google/callback", authController.GoogleCallback);
router.post("/google/logout", authController.GoogleLogout);

router.patch(
  "/verifylogin/:userID",
  authController.verifyLogin,
  quotasController.createUser,
  storedChartsController.createUser
);

router.delete("/cancellogin/:userID", authController.cancelLogin);

router.get(
  "/my-account",
  authController.protect,
  authController.getLastLogin,
  quotasController.getNumQuotas,
  storedChartsController.getNumCharts
);

module.exports = router;
