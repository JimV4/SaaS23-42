const express = require("express");
const verificationController = require("../controllers/verificationController");

const router = express.Router();

router.patch("/verifylogin/:userID", verificationController.verifyLogin);

router.patch(
  "/undoverifylogin/:userID",
  verificationController.undoVerifyLogin
);

router.delete("/cancellogin/:userID", verificationController.cancelLogin);

module.exports = router;
