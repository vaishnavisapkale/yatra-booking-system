import { useState } from "react";
import { Landmark, User, LogOut, ClipboardList, ChevronDown } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import API from "../services/api";
import { getUserRole } from "../utils/auth";

const NAV_LINKS = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/accommodation", label: "Accommodation" },
  { to: "/car-service", label: "Car Service" },
  { to: "/ropeway", label: "Ropeway" },
  { to: "/my-bookings", label: "My Bookings" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isAdmin = getUserRole() === "admin";

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      await API.post("/auth/logout", {
        token: refreshToken,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      navigate("/");
    } catch (err) {
      console.log("Logout error:", err);
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      navigate("/");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-accent-500">
      {/* MASTHEAD */}
      <div className="bg-primary-600 px-4 py-3 text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
              <Landmark className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base font-semibold leading-tight tracking-wide sm:text-lg">
                Shri Mata Vaishno Devi Shrine Board
              </h1>
              <p className="hidden text-xs text-white/70 sm:block">
                Online Yatra Booking Portal
              </p>
            </div>
          </div>

          {/* PROFILE */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 text-sm transition-colors hover:bg-white/10 focus-ring"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary-600">
                <User className="h-4 w-4" />
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-white/80" />
            </button>

            {open && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-md border border-gray-200 bg-white text-gray-700 shadow-popover">
                  {!isAdmin && (
                    <button
                      onClick={() => {
                        setOpen(false);
                        navigate("/my-bookings");
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-gray-50"
                    >
                      <ClipboardList className="h-4 w-4 text-gray-400" />
                      My Bookings
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* SUB NAV */}
      {!isAdmin && (
        <nav className="w-full overflow-x-auto border-b border-gray-200 bg-white px-4 sm:px-8">
          <div className="mx-auto flex max-w-7xl gap-1 whitespace-nowrap">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `border-b-2 px-3 py-3 text-sm font-medium tracking-wide transition-colors ${
                    isActive
                      ? "border-primary-600 text-primary-700"
                      : "border-transparent text-gray-500 hover:text-primary-600"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
