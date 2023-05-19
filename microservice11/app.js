const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");

const storedChartsRouter = require("./routes/chartsRoutes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/stored-charts", storedChartsRouter);

module.exports = app;
