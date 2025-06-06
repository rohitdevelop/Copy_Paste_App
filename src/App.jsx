import React, { createContext, useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Home from "./Component/Home";
import Paste from "./Component/Paste";
import ViewPaste from "./Component/ViewPaste";

export const Themecontext = createContext();

const App = () => {
  const [theme, setTheme] = useState("light");

  // ✅ Optional: Persist theme in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <Themecontext.Provider value={{ theme, setTheme }}>
      <div
        className={`min-h-screen transition-all duration-500 ${
          theme === "light" ? "bg-white text-black" : "bg-black text-white"
        }`}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pastes" element={<Paste />} />
          <Route path="/pastes/:id" element={<ViewPaste />} />
        </Routes>
      </div>
    </Themecontext.Provider>
  );
};

export default App;
