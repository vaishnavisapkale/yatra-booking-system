import { useState } from "react";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../services/api"

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

 const handleLogout = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    await API.post("/auth/logout", {
      token: refreshToken 
    });
    console.log(localStorage)
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    console.log(localStorage)
    navigate("/");
  } catch (err) {
    console.log("Logout error:", err);

    // even if API fails → clear locally
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");

    navigate("/");
  }
};

  return (
    <div className="w-full">

      {/* HEADER */}
      <div className="bg-[#8B0000] text-white px-8 py-4 flex justify-between items-center">

        {/* LEFT TITLE */}
        <div>
          <h1 className="text-lg md:text-xl font-semibold tracking-wide">
            Shri Mata Vaishno Devi Shrine Board
          </h1>
    
        </div>

        {/* RIGHT PROFILE */}
        <div className="relative">
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 bg-white text-[#8B0000] rounded-full flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
          </div>

          {/* DROPDOWN */}
          {open && (
            <div className="absolute right-0 mt-3 w-44 bg-white text-black border rounded-lg shadow-lg overflow-hidden">

              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/my-bookings");
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                My Bookings
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
              >
                Logout
              </button>

            </div>
          )}
        </div>

      </div>

    </div>
  );
}

export default Navbar;