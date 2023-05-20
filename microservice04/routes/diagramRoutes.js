const express = require("express");
const diagramController = require("../controllers/diagramController");

const router = express.Router();

router.post("/create", diagramController.createDiagram);

module.exports = router;
