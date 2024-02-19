const mongoose = require("mongoose"); // elegant mongodb object modeling for node.js

// Connect to database using connection string
const connectToDatabase = (connString) => {
  mongoose
    .connect(connString)
    .then(() =>
      console.log("Data Retrievel Service: DB successfully connected!")
    )
    .catch((err) => {
      console.error(err);
    });
};

// Export module
module.exports = connectToDatabase;
