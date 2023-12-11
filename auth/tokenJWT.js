const jwt = require("jsonwebtoken");
const { isTokenBlacklisted } = require('../models/userModel');

module.exports = {
  TokenCheck: (req, res, next) => {
    let token = req.get("authorization");

    if (token) {
      // Remove Bearer from string
      token = token.slice(7);

      if (!isTokenBlacklisted(token)) {
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
          if (err) {
            if (err.name === 'TokenExpiredError') {
              return res.status(401).json({
                success: 0,
                message: "Token has expired"
              });
            } else {
              console.error("JWT Verification Error:", err);
              return res.status(401).json({
                success: 0,
                message: "Invalid Token"
              });
            }
          } else {
            req.decoded = decoded;
            next();
          }
        });
      } else {
        return res.status(401).json({
          success: 0,
          message: "Token has been blacklisted. Please login first"
        });
      }
    } else {
      return res.status(403).json({
        success: 0,
        message: "Access Denied! Unauthorized User"
      });
    }
  }
};
