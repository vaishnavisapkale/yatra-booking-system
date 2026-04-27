const bookingModel = require("../models/booking")
const inventoryModel = require("../models/inventory");
const userModel = require("../models/users");

async function BookService(req, res) {
    try {
        const {
            inventoryId,
            unitsBooked,
            totalPersons,
            checkInDate,
            numberOfDays,
            pilgrims
        } = req.body;
        if (!inventoryId || !unitsBooked || !totalPersons) {
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        if (pilgrims && pilgrims.length !== totalPersons) {
            return res.status(400).json({
                message: "Pilgrims count mismatch"
            });
        }

        const inventory = await inventoryModel.findById(inventoryId);
        if (!inventory) {
            return res.status(404).json({ message: "Inventory not found" });
        }
        const type = inventory.serviceType;
        let requiredUnits;
        //room
        if (type == "accommodation") {
            const maxCapacity = unitsBooked * inventory.capacityPerUnit;
            if (totalPersons > maxCapacity) {
                return res.status(400).json({
                    message: "Room capacity exceeded"
                });
            }
            requiredUnits = unitsBooked
        } else {
            //ropeway or battery car
            if (totalPersons > inventory.availableUnits) {
                return res.status(400).json({
                    message: "Not enough seats"
                });
            }
            requiredUnits = totalPersons;
        }
        const updatedInventory = await inventoryModel.findOneAndUpdate(
            {
                _id: inventoryId,
                availableUnits: { $gte: requiredUnits }
            },
            {
                $inc: { availableUnits: -requiredUnits }
            },
            { new: true })

        if (!updatedInventory) {
            return res.status(400).json({
                message: "Not enough availability"
            });
        }

        //calculate payments
        let totalAmount = 0;
        if (type == "accommodation") {
            totalAmount = unitsBooked * inventory.price * numberOfDays;
        } else {
            totalAmount = totalPersons * inventory.price
        }

        let checkOutDate = null;
        if (checkInDate && numberOfDays) {
            checkOutDate = new Date(
                new Date(checkInDate).getTime() +
                numberOfDays * 24 * 60 * 60 * 1000
            );
        }

        //Booking 
        const booking = await bookingModel.create({
            user: req.user._id,
            inventory: inventoryId,
            checkInDate,
            checkOutDate,
            numberOfDays,
            unitsBooked,
            totalPersons,
            pricePerUnit: inventory.price,
            totalAmount,
            pilgrims
        });
        return res.status(201).json({
            message: "Booking successfull",
            booking
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message
        });
    }
}
async function getMyBookings(req, res) {
    try {
        const userId = req.user._id;
        const bookings = await bookingModel.find({ user: userId }).populate("inventory").sort({ createdAt: -1 })
        return res.status(200).json({
            count: bookings.length,
            bookings
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error fetching bookings",
            error: err.message
        });

    }
}
async function cancelService(req, res) {
    try {
        const bookingId = req.params.id;
        const booking = await bookingModel.findById(bookingId);
        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        // only owner can cancel
        if (booking.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized"
            });
        }
        if (booking.status === "cancelled") {
            return res.status(400).json({
                message: "Booking already cancelled"
            });
        }
        const inventory = await inventoryModel.findById(booking.inventory);
        if (booking.status === "cancelled") {
            return res.status(400).json({
                message: "Booking already cancelled"
            });
        }
        const type = inventory.serviceType;
        let unitsToRestore;
        if (type == "accommodation") {
            unitsToRestore = booking.unitsBooked
        } else {
            unitsToRestore = booking.totalPersons
        }

        await inventoryModel.findByIdAndUpdate(
            booking.inventory, {
            $inc: { availableUnits: unitsToRestore }
        }
        )
        booking.status = "cancelled"
        await booking.save();
        return res.status(200).json({
            message: "Booking cancelled successfully"
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error cancelling booking",
            error: err.message
        });
    }

}

async function getAllBooking(req, res) {
    try {
        const bookings = await bookingModel
            .find()
            .populate("inventory")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            count: bookings.length,
            bookings
        })
    } catch (err) {
        return res.status(500).json({
            message: "something went wrong",
            error: err.message
        })
    }

}

module.exports = { BookService, getMyBookings, cancelService, getAllBooking }