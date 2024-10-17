const User = require("../models/userModel"); // User model
const catchAsync = require("../utils/catchAsync"); // Handle try-catch
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const { promisify } = require("util"); // from util we need promisify

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

// Login User
exports.login = catchAsync(async (req, res, next) => {
    // 1) Check if email and password exists in req.body else throw an error
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError("Please provide email and password", 400));
    }

    // 2) Check if user exists and the password is correct
    const user = await User.findOne({ email }).select("+password"); // manual passwrod select

    if (!user || !(await user.validatePassword(password, user.password))) {
        // Provide vague information for security purposes
        return next(new AppError("Incorrect email or password", 400));
    }

    // 3) If everything is oky send token to the client
    createTokenAndResponse(user, 200, res);
});

// Routes Protection
exports.protect = catchAsync(async (req, res, next) => {
    // 1) Getting and token and check if it is there
    // Token is stored in header {Authorization : Bearer token...}

    // Store token
    let token;
    // Check authorization header and check if it starts with : Bearer (Convention)
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        // Store token: Split authorization value by space and store 2nd value in the token
        token = req.headers.authorization.split(" ")[1];
    }

    // Check for token
    if (!token) {
        return next(
            new AppError("You're not logged in! Please login to get access.", 401)
        );
    }

    // 2) Token Verification  (Verify token, as if the payload(_id) is not modified, or token is already expired)
    // In order to keep the nature of the async and awit: Promisify this function
    // As it is an async function
    // jwt.verify call the function ( token and process.env etc)
    // Returns a decoded payload
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    /**
     * Any error generated via this is handled in errorController.js
     * For production and development seperatly handled
     */

    // 3) Check if user stil exits
    // The decoded data contain user id, use for looking for user in db
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
        return next(
            new AppError(
                "The user belonging to this token does no longer exists.",
                401
            )
        );
    }

    // 4) Check if user changed password after the token (JWT) was issueed
    // Using the instance method defined for checking password changes in userModel.js
    if (
        currentUser.changedPasswordAfter(decoded.iat /* .iat is for: issussed at */)
    ) {
        return next(
            new AppError("User recently chaged password! Pleaase login again.", 401)
        );
    }

    // 5) If everything is right, give access to the protected route
    // GRANT ACCESS TO PROTECTED ROUTES (next middleware)
    // put user data on req.user: If user reaches here, means everything is correct
    // So, that it can be utilized in next middleware
    req.user = currentUser;
    next();
});

// UPDATE USER VIA SPECIAL ROUTE
// Signup user
exports.updateprofile = catchAsync(async (req, res, next) => {
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
    /**
     * Mongoose middleware hooks like pre and post do not work for the findByIdAndUpdate method by default.
     * The reason is that findByIdAndUpdate bypasses Mongoose middleware.
     * To enable middleware execution, you can use the alternative findOneAndUpdate method and pass the runValidators and new options.
     */
    const { email, firstName, lastName, password, confirmPassword } = req.body;
    const newUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        {
            email,
            firstName,
            lastName,
            password,
        },
        {
            runValidators: true, // To run validation hooks
            new: true, // To return the modified document instead of the original
        }
    );

    // After Successful signup, Send jwt token along with the response
    createTokenAndResponse(newUser, 201, res);
});

// Using ES6 way of passing arbitry number of roles to this warpper function
exports.restrictTo = (...roles) => {
    // Return a middle ware function from this
    return (req, res, next) => {
        // This middleware function is now able to access those parameters (roles)
        // roles=["admin",]. And Public user has role as  "user"
        /**
         * As the protect middleware function runs before this
         * Which store currentUser before calling next middleware
         * So, get the currentUser from that and check it's role
         * Based on role decide does the user has access to the resource or not.
         */
        // admin is passed as role: The thorugh includes, Check
        // if admin role is present or not:
        // If not present: Do not grant access
        // If roles (admin) is present then grant access

        //* req.user is comming from the protect middleware after successfull login

        if (!roles.includes(req.user.role)) {
            return next(
                new AppError("You don't have permission to perform this action", 403)
            ); // 403 means forbidden
        }

        // If role is included then pass to the next middleware
        next();
    };
};
