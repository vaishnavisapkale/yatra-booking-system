import templeImg from "../assets/Login.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api"

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
      console.log(data)
      setMessage(data.message);
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken); 
      navigate("/dashboard");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed ");

    }
  };


  return (
    <div className="min-h-screen flex">

      {/* LEFT */}
      <div className="hidden md:flex w-1/2 relative">
        <img
          src={templeImg}
          alt="temple"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60 flex flex-col items-start justify-center px-16">
          <h2 className="text-white text-4xl font-bold">
            Welcome to
          </h2>

          <h1 className="text-orange-400 text-7xl font-extrabold mt-4 leading-tight">
            SHRI MATA <br />
            VAISHNODEVI <br />
            SHRINE BOARD
          </h1>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gradient-to-br from-orange-100 via-orange-50 to-white">
        <div className="backdrop-blur-lg bg-white/70 p-10 rounded-3xl shadow-2xl w-96 border border-white/40">
          <h2 className="text-3xl font-normal text-orange-600 text-center mb-6">
            Welcome back!
          </h2>
          <div className="space-y-4 ">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3  rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="text-sm underline mb-5 px-2 py-1 text-orange-600 cursor-pointer">
  <Link to="/forgot-password">Forgot Password?</Link>
</p>
          {error && (
            <p className="text-red-500 text-sm mb-5 px-2">{error}</p>
          )}
          {message && (
            <p className="text-green-600 text-sm mb-5 px-2 ">{message}</p>
          )}
          <button   disabled={ !email || !password}onClick={handleLogin} className="w-full bg-orange-500 text-white p-3 rounded-lg font-semibold hover:bg-orange-600 hover:shadow-md transition duration-300 disabled:opacity-50">
            Login
          </button>
          <p className="text-sm text-center mt-6">
            Don’t have an account?{" "}
            <span className="text-orange-600 font-medium cursor-pointer hover:underline">
              <Link to="/register">Register</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;