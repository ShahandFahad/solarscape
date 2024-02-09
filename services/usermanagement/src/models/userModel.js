const mongoose = require("mongoose"); // elegant mongodb object modeling for node.js
const validator = require("validator"); // A library of string validators and sanitizers

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

// Make Model out of useSchema
const User = mongoose.model("User", userSchema);

// Export User Model
module.exports = User;
