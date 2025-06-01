const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "No token provided: Access denied" });

    jwt.verify(token, "access", (err, user) => {
        if (err) return res.status(401).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
};

module.exports = authMiddleware;
