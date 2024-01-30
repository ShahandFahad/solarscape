const express = require("express");
const app = express();

app.use(express.json()); // json parser: req handler middleware

// Run in development env
if (process.env.NODE_ENV === "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

// Routes
app.get("/api/v1/user", (req, res) => {
  res.status(200).send("User Management Serivice");
});

// Handle Non-Existing Routes: Return 404
app.all("*", (req, res) => {
  res.status(404).json({ staus: "Failed", message: "Not Found!" });
});

module.exports = app;
