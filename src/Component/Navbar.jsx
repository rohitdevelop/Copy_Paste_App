import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Importing icons for hamburger

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold tracking-wide">
          MyApp
        </Link>

        {/* Navigation Links (Visible on Desktop) */}
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
      {isOpen && (
        <div className="md:hidden flex flex-col bg-blue-600 p-4 space-y-4">
          <Link
            to="/"
            className="text-white hover:text-gray-300 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/pastes"
            className="text-white hover:text-gray-300 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Pastes
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
