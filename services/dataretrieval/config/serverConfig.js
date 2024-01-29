const app = require("../app");

// Start server
const PORT = 8003;
app.listen(PORT, () => {
  console.log(`Data Retrievel: Server is running on: http://localhost:${PORT}`);
});
