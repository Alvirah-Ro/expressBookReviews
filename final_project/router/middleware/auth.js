const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ message: "No token provided: Access denied" });
    }

    jwt.verify(token, process.env.JWT_SECRET || "default_secret", (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = user; // attach user info from token
        next();
    });
};

module.exports = authMiddleware;
