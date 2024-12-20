const express = require("express");
const router = express.Router();

// Authentication Controller
const authController = require("../controllers/authController");

// Get user route controller
const userController = require("../controllers/userController");

/**
 * Special Routes for users
 *
 * Auth controller for user signup
 * Not following the rest philosophy: Only need post requests as other or not required
 */

// User Signup
router.post("/signup", authController.signup);
// User Login
router.post("/login", authController.login);

// Special Routes
// Store user history and Get all assessmnets
router
  .route("/store-assessment-history")
  .post(userController.storeUserSolarAssessment);
// GET assessment for each user by id
router
  .route("/store-assessment-history/:id")
  .get(
    authController.protect /* (middleware) First protect route: Check login*/,
    userController.getAllUserAssessment
  );
// Delete user history by id
// router
//   .route("/store-assessment-history/:id")
//   .delete(userController.?);

// Update user profile via special route
router
  .route("/update-profile/:id")
  .patch(
    authController.protect /* (middleware) First protect route: Check login*/,
    authController.updateprofile
  );
// These routes are managed by SYSTEM Admin

//todo: chain verify otp and reset password. think about and chain them.
// Forget password
router.route("/forget-password/send-otp").post(userController.forgetPassword);
// Verify OTP
router
  .route("/forget-password/verify-otp")
  .post(userController.otpVerification);

// Update password
router
  .route("/forget-password/reset-password")
  .put(userController.resetPassword);

// Router setup
router
  .route("/")
  .get(
    authController.protect /* (middleware) First protect route: Check login*/,
    authController.restrictTo("admin") /* Restrict operation to system admin*/,
    userController.getAllUsers
  )
  .post(
    authController.protect /* (middleware) First protect route: Check login*/,
    authController.restrictTo("admin") /* Restrict operation to system admin*/,
    userController.createNewAdmin
  );

router
  .route("/:id")
  .get(
    authController.protect /* (middleware) First protect route: Check login*/,
    userController.getUser
  )
  .patch(
    authController.protect /* (middleware) First protect route: Check login*/,
    authController.restrictTo("admin"),
    userController.updateUser
  )
  .delete(
    authController.protect /* (middleware) First protect route: Check login*/,
    userController.deleteUser
  );

// Get user Stats Via Special route
router
  .route("/dashboard-stats/users-timeline")
  .get(
    authController.protect /* (middleware) First protect route: Check login*/,
    authController.restrictTo("admin") /* Restrict operation to system admin*/,
    userController.userTimeLineStats
  );
router.route("/send-feedback").post(userController.sendFeedback);
module.exports = router;
