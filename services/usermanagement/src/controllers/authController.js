const User = require("../models/userModel"); // User model
const catchAsync = require("../utils/catchAsync"); // Handle try-catch
const jwt = require("jsonwebtoken");

// Generate Token using user id
const signToken = (id) => {
  /**
   * For Generating token
   * jwt.sign(payload, secret(as per standard 32 characters long), {extra-options(expiry time etc}))
   *
   */

  const PAYLOAD = { id };
  const SECRET = process.env.JWT_SECRET; // form configuration file
  const EXPIRY = process.env.JWT_EXPIRES_IN; // form configuration file

  // Return token
  return jwt.sign(PAYLOAD, SECRET, {
    expiresIn: EXPIRY,
  });
};

// Send Response to user and Create Token
const createTokenAndResponse = (user, statusCode, res) => {
  // Token
  const token = signToken(user._id);

  // Send token to the client in cookies
  const cookiesOptions = {
    expires: new Date(
      // 24: Hours, 60: Minutes, 60: Seconds, 1000: 1 milli second
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Recieve Cookie, Store it, & Send it back with every Request
    // Such measure are necessary for preventing cross site scripting : To not modify
  };

  // For production set secure to true
  if (process.env.NODE_ENV === "production") cookiesOptions.secure = true;

  // Send cookies in response
  res.cookie("jwt", token, cookiesOptions);

  // Do not send the passowrod in response
  user.password = undefined;

  //   Response
  res.status(statusCode).json({
    status: "Success",
    token,
    data: {
      user,
    },
  });
};

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

  // After Successful signup, Send jwt token along with the response
  createTokenAndResponse(newUser, 201, res);
});
