const express = require("express");
const app = express();

// Temprory Server setup:
// Later full server setup with db connection
app.get("/", (req, res) => {
  res.status(200).send("TEST REQUEST");
});

app.listen(8000, () => {
  console.log("Server is live: http://localhost:8000/");
});
