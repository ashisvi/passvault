const Password = require("../models/password.model");

async function savePassword(req, res) {
  try {
    const newPassword = await Password.create({
      userId: req.user.id,
      ...req.body,
    });
    res.status(201).json({
      message: "Password stored successfully",
      _id: newPassword._id,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong while storing password" });
  }
}

async function fetchPasswords(req, res) {
  try {
    const userId = req.user.id;
    const passwords = await Password.find({ userId });
    res.status(200).json({ message: "Success", passwords: passwords });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong while fetching password" });
  }
}

async function fetchPasswordsByID(req, res) {
  const { id } = req.params;
  try {
    const password = await Password.findById(id).exec();
    if (!password) {
      return res.status(404).json({ message: "password not found" });
    }
    res.status(200).json({ message: "Success", passwords: password });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "password not found" });
  }
}

async function deletePassword(req, res) {
  const { id } = req.params;
  try {
    const password = await Password.findByIdAndDelete(id);
    if (!password) {
      return res.status(404).json({ message: "password not found" });
    }
    res.status(200).json({ message: "Password deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong while deleting password" });
  }
}

async function updatePassword(req, res) {
  const { id } = req.params;
  const { websiteName, websiteUrl, username, password } = req.body;

  try {
    const passwordToUpdate = await Password.findByIdAndUpdate(
      id,
      {
        websiteName,
        websiteUrl,
        username,
        password,
      },
      { new: true },
    );
    if (!passwordToUpdate) {
      return res.status(404).json({ message: "password not found" });
    }
    res.status(200).json({
      message: "Password updated successfully",
      passwords: passwordToUpdate,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong while updating password" });
  }
}

module.exports = {
  savePassword,
  fetchPasswords,
  fetchPasswordsByID,
  deletePassword,
  updatePassword,
};
