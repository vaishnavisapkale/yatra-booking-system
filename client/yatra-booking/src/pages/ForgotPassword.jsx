import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setLoading(true);
    setMessage("");

    try {
      await API.post("/auth/send-otp", { email });

      localStorage.setItem("resetEmail", email);

      setMessage("OTP sent to your email");

      setTimeout(() => {
        navigate("/verify-otp");
      }, 3000);

    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending OTP");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-orange-50">

      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl text-orange-600 mb-4 text-center">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 border rounded mb-4 border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSendOtp}
          disabled={loading}
          className="w-full bg-orange-500 text-white p-3 rounded"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>

        {message && (
          <p className="text-center text-sm mt-3">{message}</p>
        )}
      </div>

    </div>
  );
}

export default ForgotPassword;