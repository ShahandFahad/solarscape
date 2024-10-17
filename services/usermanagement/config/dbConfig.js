const mongoose = require("mongoose"); // elegant mongodb object modeling for node.js

// Connect to database using connection string
const connectToDatabase = (connString) => {
    mongoose
        .connect(connString)
        .then(() => console.log("DB successfully connected!"))
        // await User.findOneAndUpdate({ email, $set: { otp } });
        .catch((err) => {
            console.error(`Db connection error: ${err.name}, ${err.message}`);
        });
};

// Export module
module.exports = connectToDatabase;
