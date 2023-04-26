const express = require("express");
const multer = require("multer");
const csvController = require("../controllers/csvController");

const router = express.Router();

const storage = multer.memoryStorage(); // Use memory storage
const upload = multer({ storage }); // Configure multer with storage

router.post("/readfile", upload.single("csvFile"), csvController.readCSVFile);

module.exports = router;
