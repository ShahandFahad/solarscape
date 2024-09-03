const UserAssessment = require("../models/assessmentModel");
const User = require("../models/userModel");
const getMonthName = require("../utils/monthName");
const generateOtp = require("../utils/otpGenerator");
const sendEmail = require("../utils/sendemail");

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
  try {
    const { id, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, { password });
    res
      .status(200)
      .json({ status: "Success", message: "User Password Updated" });
  } catch (error) {
    res
      .status(400)
      .json({ status: "Failed", message: "User Password Not Updated" });
  }
};

// DELETE: Delete user

// As per practice, User shoudl not be completed deleted. Rather be set its
// Status to null. But just for the case we are deleting the user here permanently
// In future, Implement such practice
exports.deleteUser = async (req, res) => {
  try {
    const userID = req.params.id;
    const user = await User.findOne({ _id: userID }).select("+active");
    // If user is already is inactive - then delete it from db - When admin requst to
    if (!user.active) {
      await User.findByIdAndDelete(req.params.id);
    } else {
      // make user inactive
      await User.findByIdAndUpdate(userID, { $set: { active: false } });
    }
    // Response
    res.status(200).json({
      status: "Success",
      message: "User Deactivated | Deleted",
      data: null,
    });
  } catch (error) {
    res.status(200).json({ status: "Failed", error });
  }
};

// USER HISTORY (RECENT): Post User Solar potential Assessment to Database
// 1) Create user assessment document
// 2) Reference user id with each assessment
// 3) Access assessment for each user, referencing their user id in assessment document

exports.storeUserSolarAssessment = async (req, res) => {
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

// Foget Password controller, Generate OTP, send 1 copy to user and store 1 copy in user document
exports.forgetPassword = async (req, res) => {
  try {
    // get user email
    const { email } = req.body;

    const user = await User.findOne({ email });

    /**
     * verify user
     * send otp
     * Success response
     */

    // If no user instant fallback
    if (!user)
      return res
        .status(404)
        .json({ status: "Failed", message: "No user found with this email" });
    // If user then send 1 copy of otp via email an store one copy to db
    if (user) {
      // Get 4 digit otp: Utility function
      const otp = generateOtp();

      // Send one copy to user via email
      sendEmail(
        process.env.EMAIL_SENDER,
        process.env.ADMIN_EMAIL,
        email, // user email which will recieve email
        "Forget Password",
        `<b>This is your forget password otp</b>.
        <p>OTP <b>${otp}</b></p>
        <p>Verify your otp and reset your password</p>
        <p><i>If you did not request this otp, you can successfully ignore this message.</i></p>`
      ).catch((error) => console.log("OTP Email Sending Error: ", error));

      /**
       * AS WE HAVE USER, NOW WE WILL UPDATE USER BY ID
       */
      // Store one copy in db
      // TODO: Fix Bug Use controller forgetPassword: This lines does not update the specified user, it update the first document only check it and find a fix for it. (It is commented)
      // await User.findOneAndUpdate({ email, $set: { otp } });
      await User.findByIdAndUpdate(user._id, { $set: { otp } });
      // Success response
      res.status(200).json({
        status: "Success",
        message:
          "OTP successfully sent. Please check your email and verify otp.",
      });
    }
  } catch (error) {
    // Error response
    res.status(400).json({ status: "Failed", error });
  }
};

/**
 * This controller check user, then check user otp and then update otpVerified filed to true
 * @param {*} req
 * @param {*} res
 */
exports.otpVerification = async (req, res) => {
  try {
    const { email, otp } = req.body;

    /**
     * Check user by email,
     * Then verify otp,
     * If otp is valid then update the otpVerified filed to true.
     * */

    // check user
    const user = await User.findOne({ email });
    // If no user then instant fallback
    if (!user) {
      return res
        .status(404)
        .json({ status: "Failed", message: "No user with this email" });
    }

    // If User then verify user otp and incase of invalid fallback
    if (user.otp !== otp) {
      return res
        .status(400)
        .json({ status: "Failed", message: "Invaid OTP. Provide Valid OTP" });
    }

    // TODO: Fix Bug Use controller forgetPassword: This lines does not update the specified user, it update the first document only check it and find a fix for it. (It is commented)
    // await User.findOneAndUpdate({ email, $set: { otpVerified: true } });

    // If User reached at this point. Then the otp is valid, update the otpVerified field
    await User.findByIdAndUpdate(user._id, { $set: { otpVerified: true } });
    // Success response
    res.status(200).json({ status: "Success", message: "OTP is verified." });
  } catch (error) {
    // Error response
    res.status(400).status({ status: "Failed", error });
  }
};

/**
 * This update user password. Check User - Check OTP Verification - Check Passwords then Update password
 * @param {*} req
 * @param {*} res
 */
exports.resetPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    // Get user
    const user = await User.findOne({ email });

    // Instant Fallback incase of invalid email
    if (!user)
      return res.status(404).json({
        status: "Failed",
        message: "These is no user with this email",
      });

    if (user) {
      // Check OTP Verification
      if (!user.otpVerified)
        return res.status(400).json({
          status: "Failed",
          message: "Invlid OTP. Please verify your otp.",
        });

      // Confirm passwrod
      if (password !== confirmPassword)
        return res
          .status(402)
          .json({ status: "Failed", message: "Both password should match" });

      // TODO: Fix Bug Use controller forgetPassword: This lines does not update the specified user, it update the first document only check it and find a fix for it. (It is commented)
      // If user reaced at this point then every thing is ok, update the password
      // Update otpVerified to false for next time passwrod reset verification
      // await User.findOneAndUpdate({
      //   email,
      //   $set: { password, otpVerified: false, otp: null },
      // });

      await User.findByIdAndUpdate(user._id, {
        $set: { password, otpVerified: false, otp: null },
      });
      // Success response
      res
        .status(200)
        .json({ status: "Success", message: "Your password has been reset." });
    }
  } catch (error) {
    // Error Response
    res.status(400).json({ status: "Failed", error });
  }
};

// Send public feedback
exports.sendFeedback = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    sendEmail(
      process.env.FEEDBACK_NAME,
      process.env.ADMIN_EMAIL,
      process.env.FEEDBACK_EMAIL, // feedback email which revice feedback (admin email)
      subject,
      `<b>This is a Feeback Email from ${name}.</b>.
      <p>User Email is ${email}</p>
      <p>User Message is: ${message}</p>`
    ).catch((error) => console.log("Feedback Email Sending Error: ", error));
    res.status(200).json({ status: "Success", message: "Feedback Recieved" });
  } catch (error) {
    res
      .status(400)
      .json({ status: "Failed", message: "Feedback Not sent", error });
  }
};
