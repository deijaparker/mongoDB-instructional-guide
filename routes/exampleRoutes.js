const express = require("express");
const Example = require("../models/exampleModel");
const router = express.Router();

// POST request - Create a new document
router.post("/", async (req, res) => {
  try {
    const example = new Example(req.body);
    const savedExample = await example.save();
    res.status(201).json(savedExample);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET request - Fetch all documents
router.get("/", async (req, res) => {
  try {
    const examples = await Example.find();
    res.status(200).json(examples);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
