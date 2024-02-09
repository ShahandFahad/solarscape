/* GLOBAL SYNCHRONOUS ERROR HANDLER */
// Anywhere in th application, When a synchronous code exception is not handled
// This block of code will handle it.
// Using event listener
process.on("uncaughtException", (error) => {
  console.log("UNCAUGHT EXCEPTION (Synchronous): 🔥 Shutting down...");
  console.log("Error name: ", err.name, " : Error Message: ", err.message);

  // Shutdown the application gracefully
  // Shut down the application: .exit(0) -> success : .exit(1) -> unhandled exception
  process.exit(1); // Shutdown application
});

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
