const express = require("express");
const diagramController = require(`${__dirname}/../controllers/diagramController`);

const router = express.Router();

router.post("/create", diagramController.createDiagram);

module.exports = router;
