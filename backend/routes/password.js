const express = require("express");
const router = express.Router();

const {
  fetchPasswords,
  savePassword,
  fetchPasswordsByID,
  deletePassword,
  updatePassword,
} = require("../controllers/password.controller");

router.get("/", fetchPasswords);
router.post("/", savePassword);
router.get("/:id", fetchPasswordsByID);
router.delete("/:id", deletePassword);
router.put("/:id", updatePassword);

module.exports = router;
