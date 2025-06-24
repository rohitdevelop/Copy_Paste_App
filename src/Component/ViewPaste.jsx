import React, { useMemo, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Themecontext } from "../App";
import { LuMaximize2, LuMinimize2 } from "react-icons/lu";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.Paste?.pastes ?? []);
  const { theme } = useContext(Themecontext);
  const [isMaximized, setIsMaximized] = useState(false);

  const paste = useMemo(() => allPastes.find((p) => p._id === id), [allPastes, id]);

  if (!paste) {
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">
        Loading paste...
      </p>
    );
  }

  const toggleMaximize = () => {
    setIsMaximized((prev) => !prev);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[90vh] p-6 transition-colors duration-500 ${
        theme === "light"
          ? "bg-gradient-to-br from-gray-200 via-gray-100 to-white text-black"
          : "bg-[#0e0e0e] text-white"
      }`}
    >
      <div
        className={`
          ${isMaximized ? "w-full h-screen " : "w-full max-w-xl p-6 rounded-xl shadow-lg"}
          ${isMaximized ? "" : theme === "light" ? "bg-white shadow-gray-300" : "bg-[#1c1c1c] shadow-black/50"}
          transition-all duration-300
        `}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-center w-full">{paste.title}</h2>
          <button
            className="text-2xl ml-auto text-gray-500 hover:text-gray-700 transition cursor-pointer"
            onClick={toggleMaximize}
          >
            {isMaximized ? <LuMinimize2 /> : <LuMaximize2 />}
          </button>
        </div>

        <textarea
  className={`
    w-full ${isMaximized ? "h-[75vh]" : "h-48"} p-4 resize-none overflow-y-scroll hide-scrollbar
    ${isMaximized ? "bg-transparent border-none outline-none" : theme === "light" ? "bg-gray-100 text-black border border-gray-300" : "bg-[#2a2a2a] text-white border border-gray-600"}
    transition-all duration-300
  `}
  value={paste.content}
  disabled
/>

      </div>
    </div>
  );
};

export default ViewPaste;
