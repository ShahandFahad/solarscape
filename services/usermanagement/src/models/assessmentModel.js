const mongoose = require("mongoose");

// Define the schema
const userAssessmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference User model
    required: true,
  },
  coordinates: {
    type: {
      lat: { type: String, required: true },
      lon: { type: String, required: true },
    },
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  countryFlag: {
    type: String,
    required: true,
  },
  ACAnnual: {
    type: Number,
    required: true,
  },
  DCAnnual: {
    type: Number,
    required: true,
  },
  solarRadiationAnnual: {
    type: Number,
    required: true,
  },
  capacityFactor: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
});

/**
 * MONGOOSE MIDDLEWARE
 * Working with mongoose middlewares
 * Document Middleware: It runs before .save() and .create() command
 * Data manipulation before saving to DB
 */

// Before saving
userAssessmentSchema.pre("save", (next) => {
  console.log("Saving assessment document...");

  next();
});

// After saving
userAssessmentSchema.post("save", (document, next) => {
  console.log(document);
  console.log("...assessment saved ✅.");

  next();
});

// Create the model
const UserAssessment = mongoose.model("UserAssessment", userAssessmentSchema);

module.exports = UserAssessment;
