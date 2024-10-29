const User = require("../models/user.model");
const { generateToken } = require("../utils/auth");

async function handleUserRegister(req, res) {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: "Please, provide Name, Email and Password" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });
    // const token = generateToken(user)
    // res.cookie("token", token)
    return res.status(201).json({
      message: "User created successfully",
      id: user._id,
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    console.log("User registration error:" , err);
    return res.status(500).json({ message: "Server error occurred" });
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please, provide Email and Password" });
  }
   
  try{
    const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid Username or Password" });
  }

  const token = generateToken(user);
  // res.cookie("token", token);
  return res.status(200).json({
    message: "Logged in successfully",
    token: token,
    id: user._id,
    email: user.email,
    name: user.name,
  });
  }catch(err){
    console.log(err);
    return res.status(500).json({ message: "Server error occurred" });
  }
}

async function handleUserLogout(req, res) {
  try{
    res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully" });
  }catch(err){
    console.log(err);
    return res.status(500).json({ message: "Server error occurred" });
  }
}

async function handleUserProfile(req, res) {
  try{
      const user = await User.findById(req.user.id).select("name email");
  return res
    .status(200)
    .json({ message: "Successfully fetched profile", user: user });
  }catch(err){
    console.log(err);
    return res.status(500).json({ message: "Server error occurred" });
  }

}

module.exports = {
  handleUserRegister,
  handleUserLogin,
  handleUserLogout,
  handleUserProfile,
};
