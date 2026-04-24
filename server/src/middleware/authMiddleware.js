const jwt = require("jsonwebtoken");
const userModel = require("../models/users");

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  try {
    console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(token,decoded)
    req.user = await userModel.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    // if (err.JWT_ex)
    return res.status(401).json({ message: "Invalid token" })
  }
  if (!token) {
    return res.status(401).json({ message: "No token" })
  }
}

const authorizedRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role (${req.user.role}) not allowed`
      });
    }
    next();
  }
}

module.exports = {protect,authorizedRole}