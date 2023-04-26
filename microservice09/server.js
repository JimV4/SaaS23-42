const dotenv = require("dotenv");

dotenv.config({ path: `./config.env` });
const app = require(`./app`);

const port = process.env.PORT;

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
