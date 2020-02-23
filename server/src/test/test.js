#!/usr/bin/env node
"use strict";

const mongoose = require("mongoose");
const uri = "mongodb://bomzie:gigi@mongo:27017/test";

var connectWithRetry = function() {
  return mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: process.env.DATABASE_USER,
      pass: process.env.DATABASE_PASSWORD
    },
    function(err) {
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

var dbConnect = false;
const conn = mongoose.connection;
const Schema = mongoose.Schema;

const schema = new Schema({
  name: String
});

const Test = mongoose.model("test", schema);

const test = new Test({ name: "one" });

test.save(err => {
  if (err) return console.log(err);
});

Test.find({}, err => {
  if (!err) {
    console.log(docs);
    process.exit();
  } else {
    throw err;
  }
});
