const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: `${__dirname}/config.env` });
const app = require(`${__dirname}/app`);

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful!");
  })
  .catch((error) => {
    console.log(error.name, error.message);
    console.log("Error! Could not connect to DB");
    server.close(() => {
      process.exit(1);
    });
  });

const port = process.env.PORT;

const server = app.listen(port, process.env.BASE_URL, () => {
  console.log(`App running on 'http://${process.env.BASE_URL}:${port}'...`);
});

process.on("unhandledRejection", (error) => {
  console.log(error);
  console.log("UNHANDLED REJECTION! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
