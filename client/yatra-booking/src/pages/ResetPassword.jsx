import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  const handleResetPassword = async () => {
    try {
      await API.post("/auth/reset-password", {
        email,
        newPassword
      });

      setMessage("Password updated successfully ");

      localStorage.removeItem("resetEmail");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-orange-50">

      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl text-orange-600 mb-4 text-center">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="Enter new password"
          className="w-full p-3 border rounded mb-4"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          onClick={handleResetPassword}
          className="w-full bg-orange-500 text-white p-3 rounded"
        >
          Update Password
        </button>

        {message && (
          <p className="text-center text-green-600 text-sm mt-3">{message}</p>
        )}
      </div>

    </div>
  );
}

export default ResetPassword;