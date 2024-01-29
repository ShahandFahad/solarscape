const app = require("../app");

// Start server
const PORT = 8001;
app.listen(PORT, () => {
  console.log(
    `User Management: Server is running on: http://localhost:${PORT}`
  );
});
