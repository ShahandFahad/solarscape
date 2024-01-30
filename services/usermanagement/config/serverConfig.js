// Load Environment Variables: At the top of your app.js file
require("dotenv").config({ path: `${__dirname}/env/.env.development` });
// import app.js here
const app = require("../app");

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(
    `User Management: Server is running on: http://localhost:${port}`
  );
});
