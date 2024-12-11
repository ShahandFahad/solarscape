// Database connection function
const connectToDatabase = require("./dbConfig");

/* GLOBAL SYNCHRONOUS ERROR HANDLER */
// Anywhere in th application, When a synchronous code exception is not handled
// This block of code will handle it.
// Using event listener
process.on("uncaughtException", (error) => {
  console.log("UNCAUGHT EXCEPTION (Synchronous): 🔥 Shutting down...");
  console.log("Error name: ", error.name, " : Error Message: ", error.message);

  // Shutdown the application gracefully
  // Shut down the application: .exit(0) -> success : .exit(1) -> unhandled exception
  process.exit(1); // Shutdown application
});

// Load Environment Variables: At the top of your app.js file
require("dotenv").config({ path: `${__dirname}/env/.env.development` });
// import app.js here
const app = require("../app");

// DB connection
const connString = process.env.DATABASE_URL;
connectToDatabase(connString); // Connect to DB

// Start server
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(
    `User Management: Server is running on: ${port}`
  );
});

// Asynchronus code promise rejection handler when not handled
// Globally Handling: Unhandled promise rejection. Any where in application where a promise rejection is not handled
// using event listener
process.on("unhandledRejection", (error) => {
  console.log("UNHANDLED REJECTION (Asynchronous): 🔥 Shutting down...");
  console.log("Error name: ", error.name, " : Error Message: ", error.message);

  // Shut down the application: .exit(0) -> success : .exit(1) -> unhandled exception
  // Shut down gracefully by first finishing all the request and then shutting down
  server.close(() => {
    // finsih all requests
    process.exit(1); // shutdown application
  });
});
