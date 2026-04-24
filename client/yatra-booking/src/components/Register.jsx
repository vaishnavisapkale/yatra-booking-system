import templeImg from "../assets/Login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

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
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 relative">
        <img src={templeImg} alt="temple" className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-black/60 flex flex-col items-start justify-center px-16">
          <h2 className="text-white text-4xl font-bold">Welcome to</h2>

          <h1 className="text-orange-400 text-7xl font-extrabold mt-4 leading-tight">
            SHRI MATA <br />
            VAISHNODEVI <br />
            SHRINE BOARD
          </h1>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">

        <div className="bg-white p-10 rounded-2xl shadow-xl w-96">

          <h2 className="text-3xl font-normal text-orange-600 mb-6 text-center">
            Create Account
          </h2>

          {/*  MESSAGE */}
          {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
          {message && <p className="text-green-600 text-sm text-center mb-2">{message}</p>}

          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:ring-2 focus:ring-orange-400 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:ring-2 focus:ring-orange-400 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg mb-5 focus:ring-2 focus:ring-orange-400 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Button */}
          <button
            onClick={handleRegister}
            disabled={!name || !email || !password}
            className="w-full bg-orange-500 text-white p-3 rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-50"
          >
            Register
          </button>

          {/* Divider */}
          <div className="flex items-center my-5">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Login link */}
          <p className="text-sm text-center">
            Already have an account?{" "}
            <span className="text-orange-500 font-medium hover:underline">
              <Link to="/">Login</Link>
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;