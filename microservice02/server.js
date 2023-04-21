const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: `./config.env` });
const app = require(`./app`);

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
    console.log("DB connection succesful!");
  })
  .catch((err) => {
    console.log(err.name, err.message);
    console.log("Error! Could not connect to DB");
    server.close(() => {
      process.exit(1);
    });
  });

const port = process.env.PORT || 3001;

const server = app.listen(port, process.env.BASE_URL, () => {
  console.log(`App running on 'http://${process.env.BASE_URL}:${port}'...`);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("UNHANDLED REJECTION! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
