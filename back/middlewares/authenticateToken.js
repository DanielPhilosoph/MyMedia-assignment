const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  jwt.verify(req.headers.authorization, process.env.ACCESS_TOKEN_SECRET, (err, info) => {
    if (err) return res.status(401).json({ error: "wrong authorization" });
    req.takenInfo = info;
    next();
  });
}

module.exports = authenticateToken;
