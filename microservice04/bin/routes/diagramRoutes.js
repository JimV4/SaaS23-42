const express = require("express");
const diagramController = require("../controllers/diagramController");

const router = express.Router();

router.get("/create", diagramController.createDiagram);

module.exports = router;
