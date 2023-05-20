const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const diagramRouter = require("./routes/diagramRoutes");
const authRouter = require("./routes/authRoutes");
const templateRouter = require("./routes/templateRoutes");
const converterRouter = require("./routes/converterRoutes");

const app = express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/myCharts/diagrams", diagramRouter);
app.use("/api/myCharts/auth", authRouter);
app.use("/api/myCharts/templates", templateRouter);
app.use("/api/myCharts/convert", converterRouter);

module.exports = app;
