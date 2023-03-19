require("dotenv").config()
const jwt = require('jsonwebtoken');
const verifyJWT = (req, res, next) => {
 console.log(req.headers)
  const token = req.headers?.authorization?.split(" ")[1]
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const secret = process.env.JWT_SECRET;
  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
    console.log(error)  
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }
    req.user = decoded;
    req.body.role=decoded.role
    next();
  });
};

const verifyRefreshToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const refreshToken = authHeader && authHeader.split(' ')[1];

  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }

  const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;
  jwt.verify(refreshToken, refreshTokenSecret, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: 'Failed to authenticate refresh token' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { verifyJWT, verifyRefreshToken };


