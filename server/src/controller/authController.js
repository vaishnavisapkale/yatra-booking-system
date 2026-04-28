const userModel = require("../models/users");
const bcrypt = require("bcryptjs");
const generateTokens = require("../utils/generateTokens");
const transporter = require("../config/mail");
const jwt = require("jsonwebtoken");

//Register api
async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body
        const isUserExists = await userModel.findOne({ email });
        if (isUserExists) {
            return res.staus(400).json({ message: "User Already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.create({
            name,
            email,
            password: hashedPassword
        });
        return res.status(201).json({ message: "User registered successfully" })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Server Error"
        });

    }
}

//login api
async function loginUser(req, res) {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }
    const accessToken = generateTokens.generateAccesstoken(user);
    const refreshToken = generateTokens.generateRefreshtoken(user);
    if (!user.refreshTokens) {
        user.refreshTokens = [];
    }

    user.refreshTokens.push({ token: refreshToken });
    await user.save();
    res.status(200).json({ 
        message: "Login successful", 
        accessToken, 
        refreshToken,
          user: {
    id: user._id,
    email: user.email,
    role: user.role
  }

     })
}

//refresh-token api
async function refereshToken(req, res) {
    const { token } = req.body
    if (!token) {
        return res.status(400).json({
            message: "Referesh token required"
        })
    }
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
       
    } catch (err) {
         console.log(err)
        return res.status(403).json({
            message: "Invalid or expired refresh token"
        });
    }
    const user = await userModel.findOne({
        _id: decoded.id,
        "refreshTokens.token": token
    });
    if (!user) {
        return res.status(403).json({
            message: "Refresh token not found"
        });
    }
    const newAccesstoken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15m" });
    return res.status(200).json({
        message: "New Access Token Generated",
        accessToken: newAccesstoken
    })
}

//logout (Single device) api
async function logoutUser(req, res) {
    const { token } = req.body;
    const user = await userModel.findOne({
        "refreshTokens.token": token
    });
    if (user) {
        user.refreshTokens = user.refreshTokens.filter(
            (t) => t.token != token
        )
        await user.save()
    }
    return res.json({ message: "Logged Out" })
}

//Forgot password
async function sendOtp(req, res) {
    const { email } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10)
    user.otp = hashedOtp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "OTP verification",
        text: `Your OTP is ${otp}. It will expire in 10 minutes.`
    });
    return res.json({ message: "OTP sent successfully" });
}

async function verifyOtp(req, res) {
    const { email, otp } = req.body
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(otp, user.otp)
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid OTP" });
    }
    if (user.otpExpiry < Date.now()) {
        return res.status(400).json({ message: "OTP expired" });
    }
    res.json({
        message: "OTP verified"
    })
}

//Reset Password
async function resetpassword(req, res) {
    const { email, newPassword } = req.body
    const user = await userModel.findOne({ email })
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    res.json({
        message: "Passwprd updated successfully"
    })
}

module.exports = { registerUser, loginUser, refereshToken, logoutUser, sendOtp, verifyOtp, resetpassword }