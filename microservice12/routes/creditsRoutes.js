const express = require("express");
const creditsController = require(`${__dirname}/../controllers/creditsController`);

const router = express.Router();

router
  .route("/getRemainingCredits/")
  .get(creditsController.getRemainingCredits);

router.route("/addCredits/").post(creditsController.addCredits);

router.route("/useCredits/").post(creditsController.useCredits);

module.exports = router;
