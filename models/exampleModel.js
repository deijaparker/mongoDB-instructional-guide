const mongoose = require("mongoose");

// Define a simple schema with validation rules
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

module.exports = mongoose.model("Example", exampleSchema);
