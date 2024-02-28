const UserAssessment = require("../models/assessmentModel");
const User = require("../models/userModel");

// GET: Get all users from DB
exports.getAllUsers = (req, res) => {
  res.status(200).json({ status: "Success", message: "Get All Users" });
};

// POST: Post | Add new user to DB
exports.createUser = (req, res) => {
  res.status(200).json({ status: "Success", message: "New User Added" });
};

// GET: Get user by ID
exports.getUser = async (req, res) => {
  console.log(req.params);
  try {
    const user = await User.findById(req.params.id).select("+createdAt");
    res.status(200).json({ status: "Success", user });
  } catch (error) {
    res
      .status(200)
      .json({ status: "Failed", message: "User not found", error });
  }
};

// UPDATE: Update user details
exports.updateUser = (req, res) => {
  console.log(req.body);
  res.status(200).json({ status: "Success", message: "User Updated" });
};

// DELETE: Delete user

// As per practice, User shoudl not be completed deleted. Rather be set its
// Status to null. But just for the case we are deleting the user here permanently
// In future, Implement such practice
exports.deleteUser = async (req, res) => {
  try {
    const userID = req.params.id;
    await User.findByIdAndDelete(req.params.id);

    // Response
    res
      .status(200)
      .json({ status: "Success", message: "User Deleted", data: null });
  } catch (error) {
    res.status(200).json({ status: "Failed", error });
  }
};

// USER HISTORY (RECENT): Post User Solar potential Assessment to Database
// 1) Create user assessment document
// 2) Reference user id with each assessment
// 3) Access assessment for each user, referencing their user id in assessment document

exports.storeUserSolarAssessment = async (req, res) => {
  console.log("User Management: History Controller:", req.body);
  try {
    const {
      user,
      coordinates,
      country,
      countryFlag,
      ACAnnual,
      DCAnnual,
      solarRadiationAnnual,
      capacityFactor,
    } = req.body;

    // Save user assessment recieved form dataretreivel service
    const userAssessment = await UserAssessment.create({
      user,
      coordinates,
      country,
      countryFlag,
      ACAnnual,
      DCAnnual,
      solarRadiationAnnual,
      capacityFactor,
    });
    // Response
    res.status(200).json({
      status: "Success",
      message: "User Assessmet Saved",
      data: userAssessment,
    });
  } catch (error) {
    console.error("Error creating UserAssessment:", error.message);
    res.status(400).json({
      status: "Failed",
      message: error.message,
      error,
    });
  }
};

// Get User Assessment
exports.getAllUserAssessment = async (req, res) => {
  try {
    // Get Assessmet via user id refernced in the model
    const allAssessments = await UserAssessment.find({
      user: req.params.id,
    }).select("+createdAt");

    // Response
    res.status(200).json({
      status: "Success",
      results: allAssessments.length,
      allAssessments,
    });
  } catch (error) {
    res.status(400).json({ status: "Failed", error });
  }
};
