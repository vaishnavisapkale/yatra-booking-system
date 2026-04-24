const mongoose = require("mongoose")

const inventorySchema = new mongoose.Schema({
    serviceType: {
        type: String,
        enum: ["accommodation", "carservice", "ropeway"],
        required: true
    },
    location: {
        type: String,
        require: true
    },
    name: String, //room name
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String
    },
    totalUnits: {
        type: Number,
        required: true
    },
    availableUnits: {
        type: Number,
        required: true
    },
    capacityPerUnit: {
        type: Number,
        default: 2 // for rooms
    },
    price: {
        type: Number,
        required: true
    },
    slot: String, // morning / evening

    // 🔹 BATTERY CAR specific
    pickupPoint: String,
    dropPoint: String,

    meta: {
        type: Object
    },
}, { timestamps: true });

const Inventory = mongoose.model("Inventory", inventorySchema);
module.exports = Inventory

