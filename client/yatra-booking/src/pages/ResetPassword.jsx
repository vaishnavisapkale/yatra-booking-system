import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { Button, Input, FormField, Alert, Card } from "../components/ui";

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
    <div className="flex min-h-screen items-center justify-center bg-surface-muted px-4">
      <Card className="w-full max-w-sm">
        <h2 className="mb-1 text-xl font-semibold text-gray-900">Reset Password</h2>
        <p className="mb-6 text-sm text-gray-500">Choose a new password for your account</p>

        <FormField label="New Password">
          <Input
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </FormField>

        <Button onClick={handleResetPassword} disabled={!newPassword} fullWidth className="mt-5">
          Update Password
        </Button>

        {message && <Alert variant="success" className="mt-4">{message}</Alert>}
      </Card>
    </div>
  );
}

export default ResetPassword;
