"use strict";

require("dotenv").config();
const app = require("./sec/server.js");
const { db } = require("./sec/models/index.js");

db.sync().then(() => {
  app.start(process.env.PORT || 3000);
});