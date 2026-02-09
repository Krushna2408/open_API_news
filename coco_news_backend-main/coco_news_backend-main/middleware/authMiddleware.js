import jwt from "jsonwebtoken";
export const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ✅ Ensure `req.user` is set
    console.log("✅ User authenticated:", req.user); // ✅ Debug log
    next();
  } catch (error) {
    console.error("❌ Invalid token:", error.message);
    res.status(400).json({ error: "Invalid token" });
  }
};


export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access Denied. Admins only." });
  }
  next();
};

export const authorizeAuthorOrAdmin = (req, res, next) => {
  if (!["admin", "author"].includes(req.user.role)) {
    return res.status(403).json({ error: "Access Denied. Authors and Admins only." });
  }
  next();
};
