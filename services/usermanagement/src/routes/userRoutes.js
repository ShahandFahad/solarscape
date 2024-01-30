const express = require("express");
const router = express.Router();

// Get user route controller
const userController = require("../controllers/userController");

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
