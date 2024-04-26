const UserAssessment = require("../models/assessmentModel");
const User = require("../models/userModel");
const getMonthName = require("../utils/monthName");
// GET: Get all users from DB
exports.getAllUsers = async (req, res) => {
  try {
    const data = await User.find().select("+active").select("+createdAt");

    /**
     * {
        $group: {
          _id: { $month: "$createdAt" }, // Extract month from createdAt field
          count: { $sum: 1 }, // Count the number of users in each group
        },
      },
     */
    // Test Results
    const test = await User.aggregate([
      {
        /**
         * This Section Extract Month from 'createdAt' Field and Assign it to the id.
         *  And Count the number of documents for that month
         * */
        $group: {
          _id: { $month: "$createdAt" }, // Extract month from createdAt field
          count: { $sum: 1 }, // Count the number of users in each group
        },
      },
      {
        /**
         *  This section Assign the _id variable declared eralier to this.
         *  And Count the Month number
         */
        $project: {
          month: "$_id", // Rename _id to month
          count: 1, // Include count field
        },
      },
      {
        /** Sort In Ascending Order */
        $sort: {
          month: 1, // Sort by month ascending
        },
      },
    ]);
    console.log("TEST: ", test);

    res.status(200).json({ status: "Success", data });
  } catch (error) {
    res.status(400).json({ status: "Failed", error });
  }
};

// POST: Post | Add new user to DB
exports.createNewAdmin = async (req, res) => {
  try {
    // Register New Admin Via This route.
    const data = await User.create({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password, // Encrypt password before saving
      confirmPassword: req.body.confirmPassword,
      role: "admin",
    });
    // Response
    res.status(200).json({
      status: "Success",
      message: "New Admin Registered",
      data,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Admin Register Failed",
      error,
    });
  }
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
exports.updateUser = async (req, res) => {
  const { id, password } = req.body;
  const updatedUser = await User.findByIdAndUpdate(id, { password });
  res.status(200).json({ status: "Success", message: "User Password Updated" });
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

// Return Yearly Stats for each month
// Returns Stats for Number of users registered each month
exports.userTimeLineStats = async (req, res) => {
  try {
    let data = await User.aggregate([
      {
        /**
         * This Section Extract Month from 'createdAt' Field and Assign it to the id.
         *  And Count the number of documents for that month
         * */
        $group: {
          _id: { $month: "$createdAt" }, // Extract month from createdAt field
          count: { $sum: 1 }, // Count the number of users in each group
        },
      },
      {
        /**
         *  This section Assign the _id variable declared eralier to this.
         *  And Count the Month number
         */
        $project: {
          month: "$_id", // Rename _id to month
          count: 1, // Include count field
        },
      },
      {
        /** Sort In Ascending Order */
        $sort: {
          month: 1, // Sort by month ascending
        },
      },
    ]);

    // Replace numeric Moth by Name via Utility function
    data.map((result) => (result.month = getMonthName(result.month)));

    // Response
    res.status(200).json({ status: "Success", data });
  } catch (error) {
    res.status(400).json({ status: "Failed", error });
  }
};
