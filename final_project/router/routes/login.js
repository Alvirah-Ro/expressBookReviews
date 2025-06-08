const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");

const regd_users = express.Router();

regd_users.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials: user not found" });
        }

        // If the password is hashed in DB
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials: invalid password" });
        }

        // Create JWT
        const token = jwt.sign({ username: user.username, id: user._id}, "access", {
            expiresIn: "1hr",
        });

        return res.json({ message: "Login successful", token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error during login"});
    }
});

module.exports = regd_users;