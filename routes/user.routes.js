const express = require("express");
const router = express.Router();
const User = require("../models/user.models");

// GET all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// POST create user
router.post("/", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
  });
  const savedUser = await newUser.save();
  res.status(201).json(savedUser);
});

// GET user by ID
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// PUT update user
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE user
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

module.exports = router;
