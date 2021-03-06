const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const middlewares = require("./middlewares");
const logs = require("./api/logs");

const app = express();

const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_URI } = process.env;
console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAA", process.env.DATABASE_URI);
var connectWithRetry = () => {
  return mongoose.connect(
    process.env.DATABASE_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: DATABASE_USER,
      pass: DATABASE_PASSWORD
    },
    err => {
      if (err) {
        console.error(
          "Failed to connect to mongo on startup - retrying in 5 sec",
          err
        );
        setTimeout(connectWithRetry, 5000);
      } else {
        console.log("Connected to mongoDB");
      }
    }
  );
};

connectWithRetry();

app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World"
  });
});

app.use("/api/logs", logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
