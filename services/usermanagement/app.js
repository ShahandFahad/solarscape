const express = require("express");
const app = express();

app.use(express.json()); // json parser

app.get("/", (req, res) => {
  res.status(200).send("User Management Serivice");
});

module.exports = app;
