// MongoDB Instructional Guide - Best Practices for MongoDB with Node.js and Mongoose

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

// Define a simple schema
const exampleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name must be less than 50 characters"],
    },
    age: {
      type: Number,
      min: [18, "Age must be at least 18"],
      max: [65, "Age must be less than 65"],
      required: [true, "Age is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
  },
  { timestamps: true }
);

// Create a model based on the schema
const Example = mongoose.model("Example", exampleSchema);

// POST request - Create a new document
app.post("/api/examples", async (req, res) => {
  try {
    const example = new Example(req.body);
    const savedExample = await example.save();
    res.status(201).json(savedExample);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET request - Fetch all documents
app.get("/api/examples", async (req, res) => {
  try {
    const examples = await Example.find();
    res.status(200).json(examples);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: "An error occurred!", error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
