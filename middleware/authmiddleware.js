const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get token from header

  if (!token) return res.status(401).json({ message: "Access Denied" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });

    req.user = decoded; // Attach user data to request
    next();
  });
};
