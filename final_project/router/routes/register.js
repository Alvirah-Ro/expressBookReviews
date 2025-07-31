const express = require("express");
const public_users = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcryptjs"); // To securely store passwords
const jwt = require("jsonwebtoken");



public_users.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Input validation
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (username.length < 3 || password.length < 6) {
    return res.status(400).json({ message: "Username must be at least 3 characters; password at least 6 characters" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists "});
    }
    
    // Create and save new user with secure password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});

module.exports = public_users;
