const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanatize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

// Routes
const userRoutes = require("./src/routes/userRoutes");

// Utilities
const AppError = require("./src/utils/appError"); // Custom error handler
const globalErrorHandler = require("./src/controllers/errorController"); // Handle errors Prod & Dev

// APP
const app = express();

// allowing cross-origin
app.use(cors());

// HTTP header protection
app.use(helmet());

// Run in development env
if (process.env.NODE_ENV === "development") {
    const morgan = require("morgan");
    app.use(morgan("dev"));
}

// Limit the number of request from same ip up to 100 per hour
const limmiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many request - Please try again in an hour!"
});

// welcome route
app.get("/", (req, res) => {
    res.send("<p>Welcome to user management service</p>");
});

app.use("/api", limmiter);

// Data sanatization against noSql query injection
app.use(mongoSanatize());

// Data sanatization against XSS (cross site scripting)
app.use(xss());

// Prevent paramter pollution : Clean query string
// app.use(hpp({whitelist: ["define your white listed query parameters here"]}));

// body parser, limit payload
app.use(express.json({ limit: "10kb" }));

// End points 
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
