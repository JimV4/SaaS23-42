const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/google/callback", authController.GoogleCallback);
router.post("/google/logout", authController.GoogleLogout);

router.patch("/verifylogin/:userID", authController.verifyLogin);
router.delete("/cancellogin/:userID", authController.cancelLogin);

module.exports = router;
