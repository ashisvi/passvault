const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

const password = require("./password");
const auth = require("./auth");

router.use("/passwords", authMiddleware, password);
router.use("/auth", auth);

router.get("/", (req, res) => {
  res.send("/api endpoint");
});

module.exports = router;
