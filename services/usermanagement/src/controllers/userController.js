// GET: Get all users from DB
exports.getAllUsers = (req, res) => {
  res.status(200).json({ status: "Success", message: "Get All Users" });
};

// POST: Post | Add new user to DB
exports.createUser = (req, res) => {
  res.status(200).json({ status: "Success", message: "New User Added" });
};

// GET: Get user by ID
exports.getAllUsers = (req, res) => {
  res.status(200).json({ status: "Success", message: "Get User by ID" });
};

// UPDATE: Update user details
exports.updateUser = (req, res) => {
  res.status(200).json({ status: "Success", message: "User Updated" });
};

// DELETE: Delete user
exports.deleteUser = (req, res) => {
  res.status(200).json({ status: "Success", message: "User Deleted" });
};
