import React, { useMemo, useContext } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Themecontext } from "../App";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.Paste?.pastes ?? []);
  const { theme } = useContext(Themecontext);

  const paste = useMemo(() => allPastes.find((p) => p._id === id), [allPastes, id]);

  if (!paste) {
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">
        Loading paste...
      </p>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[90vh] p-6 transition-colors duration-500 ${
        theme === "light"
          ? "bg-gradient-to-br from-gray-200 via-gray-100 to-white text-black"
          : "bg-[#0e0e0e] text-white"
      }`}
    >
      <div
        className={`p-6 rounded-xl w-full max-w-xl shadow-lg transition duration-300 ${
          theme === "light"
            ? "bg-white shadow-gray-300"
            : "bg-[#1c1c1c] shadow-black/50"
        }`}
      >
        <h2 className="text-2xl font-bold text-center mb-4">{paste.title}</h2>

        <textarea
          className={`w-full h-48 p-4 rounded-lg resize-none transition duration-300 outline-none ${
            theme === "light"
              ? "bg-gray-100 text-black border border-gray-300"
              : "bg-[#2a2a2a] text-white border border-gray-600"
          }`}
          value={paste.content}
          disabled
        />
      </div>
    </div>
  );
};

export default ViewPaste;
