const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

const {
  handleUserLogin,
  handleUserRegister,
  handleUserLogout,
  handleUserProfile,
} = require("../controllers/user.controller");

router.post("/register", handleUserRegister);
router.post("/login", handleUserLogin);
router.get("/logout", handleUserLogout);
router.get("/profile", authMiddleware, handleUserProfile);

module.exports = router;
