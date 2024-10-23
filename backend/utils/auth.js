const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET_KEY;

function generateToken(user) {
  return jwt.sign({ id: user._id, email: user.email }, secret);
}

function verifyToken(token) {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
