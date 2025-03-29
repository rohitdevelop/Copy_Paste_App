import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-purple-900 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold tracking-wide">
          MyApp
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-gray-300 transition duration-300">
            Home
          </Link>
          <Link to="/pastes" className="text-white hover:text-gray-300 transition duration-300">
            Pastes
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden z-20 flex flex-col text-center bg-purple-800 p-4 space-y-4 absolute w-full left-0 transition-transform duration-300 ease-in-out ${
          isOpen ? "top-16" : "-top-96"
        }`}
      >
        <Link to="/" className="text-white hover:text-gray-300" onClick={() => setIsOpen(false)}>
          Home
        </Link>
        <Link to="/pastes" className="text-white hover:text-gray-300" onClick={() => setIsOpen(false)}>
          Pastes
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;