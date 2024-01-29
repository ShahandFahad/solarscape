const app = require("../app");

// Start server
const PORT = 8002;
app.listen(PORT, () => {
  console.log(
    `Solar Calculation: Server is running on: http://localhost:${PORT}`
  );
});
