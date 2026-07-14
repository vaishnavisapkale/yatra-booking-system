import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { Button, Input, FormField, Alert, Card } from "../components/ui";

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
    <div className="flex min-h-screen items-center justify-center bg-surface-muted px-4">
      <Card className="w-full max-w-sm">
        <h2 className="mb-1 text-xl font-semibold text-gray-900">Forgot Password</h2>
        <p className="mb-6 text-sm text-gray-500">
          Enter your registered email to receive a one-time password
        </p>

        <FormField label="Email Address">
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormField>

        <Button onClick={handleSendOtp} disabled={loading || !email} fullWidth className="mt-5">
          {loading ? "Sending..." : "Send OTP"}
        </Button>

        {message && <Alert variant="info" className="mt-4">{message}</Alert>}
      </Card>
    </div>
  );
}

export default ForgotPassword;
