import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
import AuthLayout from "../layouts/AuthLayout";
import { Button, Input, FormField, Alert } from "./ui";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    setMessage("");

    try {
      const { data } = await API.post("/auth/login", {
        email,
        password
      });
      setMessage(data.message);
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("role", data.user.role);
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed ");

    }
  };


  return (
    <AuthLayout>
      <h2 className="mb-1 text-2xl font-semibold text-gray-900">Sign in</h2>
      <p className="mb-6 text-sm text-gray-500">Login to manage your yatra bookings</p>

      <div className="space-y-4">
        <FormField label="Email Address">
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormField>
        <FormField label="Password">
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormField>
      </div>

      <div className="mt-2 text-right">
        <Link to="/forgot-password" className="text-sm font-medium text-primary-600 hover:underline">
          Forgot Password?
        </Link>
      </div>

      {error && <Alert variant="error" className="mt-4">{error}</Alert>}
      {message && <Alert variant="success" className="mt-4">{message}</Alert>}

      <Button
        disabled={!email || !password}
        onClick={handleLogin}
        fullWidth
        className="mt-6"
      >
        Login
      </Button>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="font-medium text-primary-600 hover:underline">
          Register
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Login;
