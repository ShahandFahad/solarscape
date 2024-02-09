const mongoose = require("mongoose"); // elegant mongodb object modeling for node.js
const validator = require("validator"); // A library of string validators and sanitizers
const bcrypt = require("bcrypt");

// Create User Model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide email!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email!"],
  },
  firstName: {
    type: String,
    required: [true, "Please provide first name!"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide last name!"],
  },
  password: {
    type: String,
    minlength: [
      8,
      "Password length must be greater than or equal to 8 characters",
    ],
    select: false, // Do not automatically include in query
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE and for all other operation it will not execute!!!
      // Do not use arrow function Cuz we need this keyword here.
      validator: function (currentPassword) {
        return this.password === currentPassword; // Compare both passwords
      },
    },
  },
  role: {
    type: String,
    enum: {
      values: ["admin", "user"],
    },
    default: "user",
  },
  // Incase if user deleted itself. Mark user as inactive
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false, // automatically hides the field
  },
});

/**
 * PASSWORD ENCRYPTION
 * Using mongoose middleware for encrypting user passowrd
 * Following the Fat Models and Thin Controllers.
 * As: Controllers are to be kept minimilistic and Models for all the business logic
 *
 * This middleware run in between the data to be stored to the database
 * So, manipulating (Performing operations on them) the data in the middle: Before storing to DB
 *
 * Instead of using arrow function use the traditional callback function to access this (keyoword
 *
 * Async function to stop blocking event loop
 */

userSchema.pre("save", async function (next) {
  // If password is not modified then return
  if (!this.isModified("password")) return next();

  // If password is modified, the encrypt it using "bcrypt"
  const COST = 12; // Hash cost
  this.password = await bcrypt.hash(this.password, COST); // Encrypt password

  // After encrypting password delete confirmPassword Field as it is only for validation
  this.confirmPassword = undefined; // Remove this field

  // Call next middleware
  next();
});

// Make Model out of useSchema
const User = mongoose.model("User", userSchema);

// Export User Model
module.exports = User;
