const express = require("express");
const googleController = require("../controllers/googleController");

const router = express.Router();

router.post("/callback", googleController.GoogleCallback);

router.get("/checklogin", googleController.isLoggedIn);

router.get("/last-login", googleController.getLastLogin);

module.exports = router;
