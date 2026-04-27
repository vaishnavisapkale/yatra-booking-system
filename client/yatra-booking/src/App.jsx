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
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import AdminDashboard from "./pages/admin/adminDashboard";
import CreateInventory from "./pages/admin/CreateInventory";
import ManageInventory from "./pages/admin/ManageInventory";
import AllBookings from "./pages/admin/AllBookings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route path="/accommodation" element={
        <ProtectedRoute>
          <MainLayout>
            <Accommodation />
          </MainLayout>
        </ProtectedRoute>

      } />
      <Route path="/ropeway" element={
        <ProtectedRoute>
          <MainLayout>
            <Ropeway />
          </MainLayout>
        </ProtectedRoute>
      }
      />
      <Route path="/car-service" element={
        <ProtectedRoute>
          <MainLayout>
            <CarService />
          </MainLayout>
        </ProtectedRoute>
      }
      />
      <Route path="/my-bookings" element={
        <ProtectedRoute>
          <MainLayout>
            <MyBookings />
          </MainLayout>
        </ProtectedRoute>
      }
      />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <MainLayout>
              <AdminDashboard />
            </MainLayout>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/create-inventory"
        element={
          <AdminRoute>
            <MainLayout>
              <CreateInventory />
            </MainLayout>
          </AdminRoute>
        }
      />
      <Route
        path="/admin/manage"
        element={
          <AdminRoute>
            <MainLayout>
              <ManageInventory />
            </MainLayout>
          </AdminRoute>
        }
      />

      <Route
        path="/admin/bookings"
        element={
          <AdminRoute>
            <MainLayout>
              <AllBookings />
            </MainLayout>
          </AdminRoute>
        }
      />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/payment-failed" element={<PaymentFailed />} />
    </Routes>
  );
}

export default App;