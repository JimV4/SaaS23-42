const express = require("express");
const passport = require("passport");
const googleController = require("../controllers/googleController");

const router = express.Router();

router.get(
  "/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/error", googleController.GoogleError);

router.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: `http://${process.env.BASE_URL}:${process.env.PORT}/auth/google/error`,
  }),
  googleController.GoogleCallback
);

router.get("/checklogin", googleController.isLoggedIn);

router.post("/logout", googleController.logout);

module.exports = router;
