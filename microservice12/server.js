const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (error) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(error);
  process.exit(1);
});

dotenv.config({ path: `./config.env` });
const app = require(`./app`);

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB connection successful!");
  });

const port = process.env.PORT || 3011;
const base_url = process.env.BASE_URL || "localhost";
const server = app.listen(port, base_url, () => {
  console.log(`App running on 'http://${base_url}:${port}'...`);
});

process.on("unhandledRejection", (error) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(error);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("Process terminated!");
  });
});
