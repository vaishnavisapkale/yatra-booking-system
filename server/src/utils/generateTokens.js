const jwt = require("jsonwebtoken");

function generateAccesstoken(user) {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15m" })
}
function generateRefreshtoken(user) {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" })
}

module.exports = { generateAccesstoken, generateRefreshtoken }