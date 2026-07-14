import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { Button, Input, FormField, Alert, Card } from "../components/ui";

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
    <div className="flex min-h-screen items-center justify-center bg-surface-muted px-4">
      <Card className="w-full max-w-sm">
        <h2 className="mb-1 text-xl font-semibold text-gray-900">Verify OTP</h2>
        <p className="mb-6 text-sm text-gray-500">
          Enter the one-time password sent to {email || "your email"}
        </p>

        <FormField label="OTP">
          <Input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </FormField>

        <Button onClick={handleVerifyOtp} disabled={!otp} fullWidth className="mt-5">
          Verify OTP
        </Button>

        {message && <Alert variant="info" className="mt-4">{message}</Alert>}
      </Card>
    </div>
  );
}

export default VerifyOtp;
