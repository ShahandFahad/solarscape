const User = require("../models/userModel"); // User model
const catchAsync = require("../utils/catchAsync"); // Handle try-catch

// Signup user
exports.signup = catchAsync(async (req, res, next) => {
  /**
   * BE AWARE of this -> SECURITY FLAW
   *
   * THIS WAY of USER Signup: const newUser = await User.create(req.body);
   *
   * Because of this:
   * Anyone via post request can register itself as admin
   * So, do not send req.body to the database directly insted,
   * Send the specfied field a user require and eleminate all the extra fields
   */

  // Only allow the required filed to store in DB
  // Return a promise so use await
  const newUser = await User.create({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password, // Encrypt password before saving
    confirmPassword: req.body.confirmPassword,
  });

  //   Response
  res.status(200).json({
    status: "Success",
    data: {
      newUser,
    },
  });
});
