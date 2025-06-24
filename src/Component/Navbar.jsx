import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { Themecontext } from "../App";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { theme, setTheme } = useContext(Themecontext);
  const location = useLocation();

  // Get task count from Redux
  const totalTasks = useSelector((state) => state.Paste?.pastes?.length ?? 0);

  // Local notification state
  const [taskNotification, setTaskNotification] = useState(totalTasks);

  // Update notification when new tasks are added
  useEffect(() => {
    setTaskNotification(totalTasks);
  }, [totalTasks]);

  // Reset notification when on tasks page
  useEffect(() => {
    if (location.pathname === "/tasks") {
      setTaskNotification(0);
    }
  }, [location.pathname]);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("dark");
      setTheme("dark");
    } else {
      root.classList.remove("dark");
      setTheme("light");
    }
  };

  return (
    <nav
      className={`p-4 transition-all duration-500 rounded-xl
        ${theme === "light"
          ? "bg-white text-black border border-gray-300 shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
          : "bg-[#1a1a1a] text-white border border-gray-700 shadow-[0_4px_12px_rgba(255,255,255,0.05)]"
        }`}
    >
      <div className="max-w-screen-xl mx-auto flex justify-center items-center relative">
        <div className="flex space-x-10 text-center">
          <Link
            to="/"
            className={`text-lg font-semibold transition duration-300 ${
              theme === "light"
                ? "text-black hover:text-purple-600"
                : "text-white hover:text-purple-600"
            }`}
          >
            Home
          </Link>

          <Link
            to="/tasks"
            className={`text-lg font-semibold transition duration-300 relative ${
              theme === "light"
                ? "text-black hover:text-purple-600"
                : "text-white hover:text-purple-600"
            }`}
          >
            Tasks
            {taskNotification > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {taskNotification}
              </span>
            )}
          </Link>
        </div>

        <button
          onClick={toggleTheme}
          className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-yellow-400 transition duration-300"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
