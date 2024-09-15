const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Mongoose Connection - Best Practice
mongoose
  .connect("mongodb://localhost:27017/mongodbGuide", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Import routes
const exampleRoutes = require("./routes/exampleRoutes");
app.use("/api/examples", exampleRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: "An error occurred!", error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
