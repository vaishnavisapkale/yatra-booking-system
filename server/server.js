const dotenv = require("dotenv");
const app = require("./src/app");
const connectDB = require("./src/config/db")
const authRoutes = require("./src/routes/authRoutes")
const bookingRoutes = require("./src/routes/bookingRoutes")
const inventoryRoutes = require("./src/routes/inventoryRoutes")

dotenv.config();

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/booking", bookingRoutes)
app.use("/api/inventory", inventoryRoutes)

app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})