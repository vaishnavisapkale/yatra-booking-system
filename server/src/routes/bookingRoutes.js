const express = require("express")
const router = express.Router();

const bookingController = require("../controller/bookingController")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/book", authMiddleware.protect, bookingController.BookService);
router.get("/mybookings", authMiddleware.protect,bookingController.getMyBookings);
router.post("/cancel/:id", authMiddleware.protect, bookingController.cancelService);
router.get("/getAll", authMiddleware.protect, authMiddleware.authorizedRole("admin"), bookingController.getAllBooking);
module.exports = router