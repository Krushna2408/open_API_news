import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import client from "../config/db.js";
import Joi from "joi";

// Validation Schema
const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Register a new user
export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validate input
  const { error } = userSchema.validate({ name, email, password });
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    // Check if email already exists
    const existingUser = await client.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) return res.status(400).json({ error: "Email already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const result = await client.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, 'user') RETURNING id",
      [name, email, hashedPassword]
    );

    // Generate JWT token
    const token = jwt.sign(
      { userID: result.rows[0].id, email, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({ message: "User registered successfully", token, role: "user" });
  } catch (error) {
    next(error);
  }
};

// Login a user
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Fetch user by email
    const result = await client.query("SELECT id, email, password, role FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) return res.status(401).json({ error: "Invalid email or password" });

    const user = result.rows[0];

    // Check password validity
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: "Invalid email or password" });

    // Generate JWT token
    const token = jwt.sign(
      { userID: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login successful", token, role: user.role });
  } catch (error) {
    next(error);
  }
};

// Update user role
export const updateUserRole = async (req, res, next) => {
  const { role } = req.body;
  const userID = req.params.id;

  if (!["user", "author"].includes(role)) {
    return res.status(400).json({ error: "Invalid role. Allowed roles: user, author" });
  }

  try {
    const result = await client.query("UPDATE users SET role = $1 WHERE id = $2 RETURNING id", [role, userID]);

    if (result.rowCount === 0) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: `User role updated to ${role}` });
  } catch (error) {
    next(error);
  }
};

// Global Error Handler Middleware
export const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
};
