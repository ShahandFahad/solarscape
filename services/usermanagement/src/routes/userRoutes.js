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

// These routes are managed by SYSTEM Admin

// Router setup
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
