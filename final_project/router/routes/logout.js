const express = require("express");
const router = express.Router();

router.post("/logout", (req, res) => {
    // No server-side session to clear
    res.json({ message: "Logout successful on client side" });
});

module.exports = router;