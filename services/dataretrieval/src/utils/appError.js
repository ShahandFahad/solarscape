// This is a utility class for handling error.

/**
 * Throuh constructor recieves:
 * 1) Custom error message
 * 2) Custom error status code
 *
 * Based on status code decides wheter it is failure or an erro
 */

class AppError extends Error {
  // Custom error handler class: which handles operational error
  constructor(message, statusCode) {
    super(message); // Pass message to parent

    this.statusCode = statusCode;
    // Decide: If starts with 4 then fail else an error
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // Check error type

    // Capture
    Error.captureStackTrace(this, this.constructor);
  }
}

// Export module
module.exports = AppError;
