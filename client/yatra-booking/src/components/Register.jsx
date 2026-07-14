import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
import AuthLayout from "../layouts/AuthLayout";
import { Button, Input, FormField, Alert } from "./ui";

function Register() {
  const navigate = useNavigate();

  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // register function
  const handleRegister = async () => {
    setError("");
    setMessage("");

    try {
      const { data } = await API.post("/auth/register", {
        name,
        email,
        password
      });

      setMessage(data.message);

      //clear form
      setName("");
      setEmail("");
      setPassword("");

      // redirect to login
      setTimeout(()=>{
   navigate("/");
      },1000)


    } catch (err) {
      setError(err.response?.data?.message || "Registration failed ");
    }
  };

  return (
    <AuthLayout>
      <h2 className="mb-1 text-2xl font-semibold text-gray-900">Create account</h2>
      <p className="mb-6 text-sm text-gray-500">Register to start booking your yatra services</p>

      {error && <Alert variant="error" className="mb-4">{error}</Alert>}
      {message && <Alert variant="success" className="mb-4">{message}</Alert>}

      <div className="space-y-4">
        <FormField label="Full Name">
          <Input
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormField>

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

      <Button
        onClick={handleRegister}
        disabled={!name || !email || !password}
        fullWidth
        className="mt-6"
      >
        Register
      </Button>

      <div className="my-5 flex items-center">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="px-3 text-xs uppercase tracking-wide text-gray-400">Or</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link to="/" className="font-medium text-primary-600 hover:underline">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Register;
