const dotenv = require("dotenv");
const app = require("./src/app");
const connectDB = require("./src/config/db")
const authRoutes = require("./src/routes/authRoutes")
const bookingRoutes = require("./src/routes/bookingRoutes")
const inventoryRoutes = require("./src/routes/inventoryRoutes")
const paymentRoutes = require("./src/routes/paymentRoutes")
dotenv.config();

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/booking", bookingRoutes)
app.use("/api/inventory", inventoryRoutes)
app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})