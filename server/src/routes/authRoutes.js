const express = require("express")
const router = express.Router();

const authController = require("../controller/authController")

router.post("/register", authController.registerUser)
router.post("/login", authController.loginUser)
router.post("/refresh-token", authController.refereshToken)
router.post("/logout", authController.logoutUser)
router.post("/send-otp", authController.sendOtp)
router.post("/verify-otp", authController.verifyOtp)
router.post("/reset-password", authController.resetpassword)

module.exports = router