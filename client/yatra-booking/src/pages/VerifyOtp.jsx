import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  const handleVerifyOtp = async () => {
    try {
      await API.post("/auth/verify-otp", { email, otp });

      setMessage("OTP verified ");

      setTimeout(() => {
        navigate("/reset-password");
      }, 1000);

    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-orange-50">

      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl text-orange-600 mb-4 text-center">
          Verify OTP
        </h2>
        
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full p-3 border rounded mb-4"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          onClick={handleVerifyOtp}
          className="w-full bg-orange-500 text-white p-3 rounded"
        >
          Verify OTP
        </button>

        {message && (
          <p className="text-center text-sm mt-3">{message}</p>
        )}
      </div>

    </div>
  );
}

export default VerifyOtp;