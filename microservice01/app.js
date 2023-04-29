const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const diagramRouter = require("./routes/diagramRoutes");
const authRouter = require("./routes/authRoutes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/api/myCharts/diagrams", diagramRouter);
app.use("/api/myCharts/auth", authRouter);

module.exports = app;
