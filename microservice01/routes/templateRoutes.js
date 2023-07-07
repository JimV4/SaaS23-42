const express = require("express");
const templateController = require(`${__dirname}/../controllers/templateController`);
const authController = require(`${__dirname}/../controllers/authController`);

const router = express.Router();

router.get(
  "/download/:diagram",
  authController.protect,
  templateController.downloadTemplate
);

module.exports = router;
