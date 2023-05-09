const express = require("express");
const templateController = require("../controllers/templateController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get(
  "/download/:diagram",
  authController.protect,
  templateController.downloadTemplate
);

module.exports = router;
