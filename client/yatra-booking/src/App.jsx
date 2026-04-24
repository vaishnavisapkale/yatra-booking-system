import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import Accommodation from "./pages/Accomodation";
import Ropeway from "./pages/Ropeway";
import CarService from "./pages/CarService";
import MyBookings from "./pages/MyBookings";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={
        <MainLayout>
          <Dashboard />
        </MainLayout>

      } />
      <Route path="/accommodation" element={
        <MainLayout>
          <Accommodation />
        </MainLayout>

      } />
      <Route path="/ropeway" element={
          <MainLayout>
            <Ropeway />
          </MainLayout>
        }
      />
      <Route path="/car-service" element={
          <MainLayout>
            <CarService />
          </MainLayout>
        }
      />
       <Route path="/my-bookings" element={
          <MainLayout>
            <MyBookings />
          </MainLayout>
        }
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/verify-otp" element={<VerifyOtp />} />
<Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;