import React, { useEffect, useState, useMemo, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPaste } from "../Redux/PasteSlice";
import HoverBorderGradient from "../Component/HoverBorderGradient";
import { Themecontext } from "../App"; // ✅ Theme context

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.Paste?.pastes ?? []);
  const pastesMemoized = useMemo(() => allPastes, [allPastes]);

  const { theme } = useContext(Themecontext); // ✅ Access theme

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  function createOrUpdatePaste() {
    if (!title.trim() || !value.trim()) {
      return alert("Title and content cannot be empty!");
    }

    const paste = {
      title: title.trim(),
      content: value.trim(),
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPaste(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[92vh] px-4 py-8 transition-colors duration-500 ${
        theme === "light" ? "bg-white text-black" : "bg-[#121212] text-white"
      }`}
    >
      <HoverBorderGradient
        as="div"
        containerClassName="w-full max-w-2xl rounded-2xl"
      >
        <div
          className={`w-full rounded-2xl p-6 shadow-xl transition-all duration-300 ${
            theme === "light"
              ? "bg-white text-black"
              : "bg-[#1e1e1e] text-white"
          }`}
        >
          <h1 className="text-3xl font-bold text-center mb-6">
            {pasteId ? "Update Paste" : "Create My Paste"}
          </h1>

          {/* Title Input */}
          <input
            className={`w-full p-3 rounded-lg mb-4 transition-all duration-200 shadow-sm border outline-none ${
              theme === "light"
                ? "border-gray-400 bg-white text-black focus:ring-blue-500"
                : "border-gray-700 bg-[#2a2a2a] text-white focus:ring-purple-500"
            }`}
            type="text"
            value={title}
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Content Textarea */}
          <textarea
            className={`w-full h-40 p-4 rounded-lg resize-none shadow-sm border outline-none transition-all duration-200 ${
              theme === "light"
                ? "border-gray-300 bg-white text-black focus:ring-blue-500"
                : "border-gray-700 bg-[#2a2a2a] text-white focus:ring-purple-500"
            }`}
            value={value}
            placeholder="Enter content..."
            onChange={(e) => setValue(e.target.value)}
          />

          {/* Button */}
          <button
            className="w-full mt-5 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 active:scale-95 transition-all duration-300 shadow-md"
            onClick={createOrUpdatePaste}
          >
            {pasteId ? "Update Paste" : "Add My Paste"}
          </button>
        </div>
      </HoverBorderGradient>
    </div>
  );
};

export default Home;
