const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.patch("/verifylogin/:userID", authController.verifyLogin);
router.delete("/cancellogin/:userID", authController.cancelLogin);

module.exports = router;
