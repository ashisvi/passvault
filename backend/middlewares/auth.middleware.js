const { verifyToken } = require("../utils/auth");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Access Denied" });
  }

  const token = authHeader.split(" ")[1];
  const verifiedUser = verifyToken(token);
  if (!verifiedUser) {
    return res.status(401).json({ message: "Access Denied" });
  }

  req.user = verifiedUser;
  next();
}

module.exports = authMiddleware;
