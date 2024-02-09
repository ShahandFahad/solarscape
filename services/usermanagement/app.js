const express = require("express");

// Utilities
const AppError = require("./src/utils/appError"); // Custom error handler
const globalErrorHandler = require("./src/controllers/errorController"); // Handle errors Prod & Dev

// APP
const app = express();

app.use(express.json()); // json parser: req handler middleware

// Run in development env
if (process.env.NODE_ENV === "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

//  User routes
const userRoutes = require("./src/routes/userRoutes");

// Routes
app.use("/api/v1/user", userRoutes);

// NON EXISTENT, UNHANDLED ROUTES

// Handling unhandled routes
// Handling bad request url
// app.all => for all http methods: get, post etc...
// Use middleware

app.use("*", (req, res, next) => {
  // Pass error to the next middleware (next middleware after this is the global error handler)
  next(new AppError(`Cann't find ${req.originalUrl} on this server!`, 404));
});

// Call Global Error Handler Middleware
app.use(globalErrorHandler);

// Export APP module
module.exports = app;
