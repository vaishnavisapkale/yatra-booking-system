const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    email:{
        unique: true,
        type : String
    },
    password: String,
    role:{
        type:String,
        enum:["user","admin"],
        default: "user"
    },
    otp: String,
    otpExpiry: Date,
    refreshTokens:[{
        token: String
    }]
})

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel