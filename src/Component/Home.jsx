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
  const tasksId = searchParams.get("tasksId");

  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.Paste?.pastes ?? []);
  const pastesMemoized = useMemo(() => allPastes, [allPastes]);

  const { theme } = useContext(Themecontext); // ✅ Access theme

  useEffect(() => {
    if (tasksId) {
      const paste = allPastes.find((p) => p._id === tasksId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [tasksId, allPastes]);

  function createOrUpdatePaste() {
    if (!title.trim() || !value.trim()) {
      return alert("Title and content cannot be empty!");
    }

    const paste = {
      title: title.trim(),
      content: value.trim(),
      _id: tasksId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (tasksId) {
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
    theme === "light" ? "bg-gradient-to-tr from-gray-100 to-white text-black" : "bg-gradient-to-tr from-[#121212] to-[#1a1a1a] text-white"
  }`}
>
  <HoverBorderGradient as="div" containerClassName="w-full max-w-2xl rounded-2xl">
    <div
      className={`w-full rounded-2xl p-6 shadow-2xl transition-all duration-500 ${
        theme === "light" ? "bg-white text-black" : "bg-[#1e1e1e] text-white"
      }`}
    >
      <h1 className="text-3xl font-bold text-center mb-6">
        {tasksId ? "Update Task" : "Create your Task"}
      </h1>

      {/* Title Input */}
      <input
        className={`w-full p-3 rounded-lg mb-4 transition-all duration-300 shadow-sm border outline-none ${
          theme === "light"
            ? "border-gray-300 bg-gray-100 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
            : "border-gray-700 bg-[#2a2a2a] text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
        }`}
        type="text"
        value={title}
        placeholder="Enter title"
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Content Textarea */}
      <textarea
        className={`w-full h-40 p-4 rounded-lg resize-none shadow-sm border outline-none transition-all duration-300  ${
          theme === "light"
            ? "border-gray-300 bg-gray-100 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
            : "border-gray-700 bg-[#2a2a2a] text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
        }`}
        value={value}
        placeholder="Enter content..."
        onChange={(e) => setValue(e.target.value)}
      />

      {/* Button */}
      <button
        className="w-full mt-5 bg-gradient-to-r cursor-pointer from-purple-600 to-purple-800 text-white py-3 rounded-lg font-semibold hover:opacity-90 active:scale-95 transition-all duration-300 shadow-lg"
        onClick={createOrUpdatePaste}
      >
        {tasksId ? "Update Task" : "Add Your Task"}
      </button>
    </div>
  </HoverBorderGradient>
</div>

  );
};

export default Home;
