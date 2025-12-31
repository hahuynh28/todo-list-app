import jwt from "jsonwebtoken";

// Middleware for user authentication
export default function auth(req, res, next) {
  // Get Authorization header
  const authHeader = req.headers.authorization;

  // If there is no header or the Bearer is not in the correct format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Separate the token from the string "Bearer <token>"
  const token = authHeader.split(" ")[1];

  try {
    // Verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Save userId in the request for the controller to use
    req.userId = decoded.userId;

    // Allow the request to proceed
    next();
  } catch {
    // Invalid or expired token
    return res.status(401).json({ message: "Invalid token" });
  }
}
