const express = require("express");
const app = express();

app.use(express.json()); // json parser

app.get("/", (req, res) => {
  res.status(200).send("Data Retrievel Serivice");
});

module.exports = app;
