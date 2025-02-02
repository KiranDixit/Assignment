const express = require("express");
const app = express();
const routes = require("./routes"); // Import routes
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON requests
app.use("/", routes); // Redirect all route requests to routes.js

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
module.exports = app;