const express = require("express");
const app = express();

app.use(express.json()); // json parser

app.get("/", (req, res) => {
  res.status(200).send("Solar Calculation Serivice");
});

module.exports = app;
