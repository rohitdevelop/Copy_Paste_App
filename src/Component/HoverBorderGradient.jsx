"use client";
import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Themecontext } from "../App";

export default function HoverBorderGradient({
  children,
  containerClassName = "",
  className = "",
  as: Tag = "div",
  duration = 2,
  clockwise = true,
  ...props
}) {
  const { theme } = useContext(Themecontext);
  const [direction, setDirection] = useState("TOP");
  const [hovered, setHovered] = useState(false);

  const rotateDirection = (current) => {
    const dirs = ["TOP", "RIGHT", "BOTTOM", "LEFT"];
    const index = dirs.indexOf(current);
    return dirs[(index + (clockwise ? 1 : -1 + dirs.length)) % dirs.length];
  };

  // Sexy dark purple & black gradients
const lightGradients = {
  TOP: "radial-gradient(circle at 50% 0%, #6b21a8, #581c87 70%, transparent 100%)",
  RIGHT: "radial-gradient(circle at 100% 50%, #7e22ce, #4c1d95 70%, transparent 100%)",
  BOTTOM: "radial-gradient(circle at 50% 100%, #5b21b6, #3b0764 70%, transparent 100%)",
  LEFT: "radial-gradient(circle at 0% 50%, #7c3aed, #4c1d95 70%, transparent 100%)",
};


  const darkGradients = {
    TOP: "radial-gradient(circle at 50% 0%, #fff, transparent)",
    RIGHT: "radial-gradient(circle at 100% 50%, #fff, transparent)",
    BOTTOM: "radial-gradient(circle at 50% 100%, #fff, transparent)",
    LEFT: "radial-gradient(circle at 0% 50%, #fff, transparent)",
  };

  const gradientMap = theme === "light" ? lightGradients : darkGradients;

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection((prev) => rotateDirection(prev));
    }, duration * 1000);
    return () => clearInterval(interval);
  }, [theme, duration, clockwise]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded-2xl transition-all duration-500 ${containerClassName}`}
      {...props}
    >
      {/* Glowing animated background */}
      <motion.div
        className="absolute inset-0 rounded-2xl z-0"
style={{
  filter: theme === "light" ? "blur(10px)" : "blur(20px)",
}}
        animate={{
          background: hovered
            ? [
                gradientMap[direction],
                gradientMap[rotateDirection(direction)],
              ]
            : gradientMap[direction],
        }}
        transition={{ duration, ease: "linear" }}
      />

      {/* Main content */}
      <div
        className={`
          relative z-10 rounded-2xl p-6
          transition-colors duration-500 ease-in-out
          shadow-xl
          ${theme === "light"
            ? `bg-gradient-to-br from-white via-gray-300 to-gray-500
               text-white
               hover:brightness-105
              `
            : `bg-gradient-to-br from-purple-900 via-purple-800 to-gray-900
               text-purple-100
               hover:brightness-110`
          }
          ${className}
        `}
      >
        {children}
      </div>
    </Tag>
  );
}
