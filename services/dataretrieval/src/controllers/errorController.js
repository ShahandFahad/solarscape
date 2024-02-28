/**
 * This is an error controller for both production and development environment
 *
 * For development environment pass error information
 * For production do not leak error information to the clients. Only a formatted error message
 *
 */

const AppError = require("../utils/appError");

// Development erro handler
const sendErrorDev = (err, res) => {
  // Send response
  res.status(res.statusCode).json({
    status: err.status,
    name: err.name,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

// Production Errors

// ERROR MODULE
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  //   Check for error environment : Production or Development
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res); // Custom fucntion for development error handling
  } else if (process.env.NODE_ENV === "production") {
    // Handle all production errors.
    // TODO: Handle production error
    // Handle invalid token error: JsonWebTokenError
  }
};
