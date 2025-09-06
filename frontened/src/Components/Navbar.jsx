import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, LogIn, UserPlus, LogOut, ListCheck } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gray-900 shadow-md animate-fade-in">
      <div className="flex items-center gap-2">
        <ListCheck className="w-6 h-6 text-emerald-400 hover:text-emerald-300 hover:scale-110 transition-all duration-300" />
        <h1 className="text-2xl font-bold text-emerald-400">Todo App</h1>
      </div>

      <div className="flex gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-200 hover:text-emerald-300 font-semibold transition-all duration-300"
        >
          <Home className="w-5 h-5 hover:scale-110 transition-transform duration-300" />
          Home
        </Link>

        {!token ? (
          <>
            <Link
              to="/login"
              className="flex items-center gap-2 text-gray-200 hover:text-emerald-300 font-semibold transition-all duration-300"
            >
              <LogIn className="w-5 h-5 hover:scale-110 transition-transform duration-300" />
              Login
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-2 text-gray-200 hover:text-emerald-300 font-semibold transition-all duration-300"
            >
              <UserPlus className="w-5 h-5 hover:scale-110 transition-transform duration-300" />
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-200 hover:text-emerald-300 font-semibold transition-all duration-300"
          >
            <LogOut className="w-5 h-5 hover:scale-110 transition-transform duration-300" />
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;