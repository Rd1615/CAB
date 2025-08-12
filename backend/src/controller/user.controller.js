const userModule = require("../models/user.model.js");
const {generateToken}  = require("../lib/utils.js");

exports.checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user); // req.user is full user object from DB
  } catch (error) {
    console.error("CheckAuth Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.signup = async (req, res) => {
  const { fullName, email, password, phone, location } = req.body;

  try {
    // Validate input
    if (!fullName || !email || !password || !phone || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Check if user already exists
    const existingUser = await userModule.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create new user
    const userId = await userModule.createUser({ fullName, email, password, phone, location });
    console.log("New User Created ID:", userId);

    // ✅ Issue JWT token
    generateToken(userId, res);

    return res.status(201).json({ message: "User registered successfully", userId });
    
  } catch (error) {
    console.error("Signup error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await userModule.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // ✅ Issue JWT token
    generateToken(user.id, res);

    return res.status(200).json({ message: "Login successful", userId: user.id });

  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.logout = (req, res) => {
  try {
    // Clear the JWT cookie by setting it to empty with maxAge 0
    res.cookie("jwt", "", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 0,
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
