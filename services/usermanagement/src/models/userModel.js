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
  passwordChangedAt: Date, // This property specifies that user has changed password or not
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

// Passowrd Validation during login using instance method (Available on all documents)
userSchema.methods.validatePassword = async (
  candidatePassword, // form request body
  userPassword // encrypted password from db
) => {
  // By using bycrypt compare function validate password
  return bcrypt.compare(candidatePassword, userPassword);
};

// This modifies and add passwordChangedAt Field to the user document, before saving
userSchema.pre("save", function (next) {
  // Check if it is new document or password is not modified, then return
  if (!this.isModified("password") || this.isNew) return next();

  // Otherwise update the field
  // Subtract 1 second from it. So just incase any token delay issue etc
  this.passwordChangedAt = Date.now() - 1000; // 1000 = 1sec

  next();
});

// Check wether passord is changed or not after token is generated
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  /**
   * For most user this property (this.passwordChangedAt) will not exits in the document
   * Unless user changed passowrd and the property get defined in the document
   * The Start the comparion with the JWT Timestamp
   */

  // If password is changed then compare
  if (this.passwordChangedAt) {
    // Convert it to timestamp like jwt
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    ); // convert to seconds from milliseconds and specify base: 10

    // Compare and return
    return JWTTimestamp < changedTimestamp;
  }

  // By default return false: False means NOT changed
  return false; // If password is not changed after issuing token
};

// Make Model out of useSchema
const User = mongoose.model("User", userSchema);

// Export User Model
module.exports = User;
