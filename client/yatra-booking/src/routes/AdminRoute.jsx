import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../utils/auth";

function AdminRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/" />;
  }

  if (getUserRole() !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default AdminRoute;