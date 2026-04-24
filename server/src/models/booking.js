const mongoose = require("mongoose");
const Inventory = require("./inventory");

const pilgrimSchema = new mongoose.Schema({
    name: String,
    gender: String,
    age: Number,
    idType: String,
    idNumber: String,
    // isPrimary: boolean
});

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    inventory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Inventory",
        required: true
    },
    checkInDate: Date,
    checkOutDate: Date,
    travelDate: Date,
    unitsBooked: Number,
    totalPersons: Number,
    numberOfDays: Number,
    pricePerUnit: Number,
    capacityPerUnit: Number,
    totalAmount: Number,
    pilgrims: [pilgrimSchema],
    status: {
        type: String,
        enum: ["booked", "cancelled"],
        default: "booked"
    },
    slot: String, // morning / afternoon
    // CAR specific
    pickupPoint: String,
    dropPoint: String

}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking