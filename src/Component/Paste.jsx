import React, { useState, useMemo, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removePaste } from "../Redux/PasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Themecontext } from "../App"; // 🟡 Import context

const Paste = () => {
  const dispatch = useDispatch();
  const [searchItem, setSearchItem] = useState("");
  const pastes = useSelector((state) => state.Paste?.pastes ?? []);
  const { theme } = useContext(Themecontext); // 🟡 Get current theme

  const filteredData = useMemo(() => {
    return pastes.filter((paste) =>
      paste?.title?.toLowerCase().includes(searchItem.toLowerCase())
    );
  }, [pastes, searchItem]);

  const handleDelete = (pasteId) => {
    dispatch(removePaste(pasteId));
  };

  const generateShareLink = (pasteId) => {
    const shareLink = `${window.location.origin}/pastes/${pasteId}`;
    navigator.clipboard.writeText(shareLink);
    toast.success("Share link copied to clipboard!");
  };

  return (
    <div
      className={`p-12 md:p-12 min-h-screen flex flex-col items-center transition-all duration-300 ${
        theme === "dark" ? "bg-black text-white" : "bg-purple-100 text-black"
      }`}
    >
      {/* Search Bar */}
      <div className="w-full max-w-md">
        <input
          className="w-full p-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-purple-500 shadow-sm bg-white text-black"
          type="search"
          placeholder="Search pastes..."
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </div>

      {/* Paste List */}
      <div className="mt-4 w-full max-w-lg text-center space-y-4">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className={`shadow-md rounded-lg p-3 flex flex-col gap-2 transition ${
                theme === "dark"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-black"
              }`}
            >
              <div>
                <h2 className="text-lg font-semibold truncate">{paste.title}</h2>
                <p className="text-sm truncate">{paste.content}</p>
                <span className="text-xs text-gray-400">
                  {new Date(paste.createdAt).toLocaleString()}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <Link to={`/?pasteId=${paste?._id}`}>
                  <button className="text-white font-bold border-2 border-black text-sm px-2 py-1 bg-blue-500 rounded-md hover:bg-blue-400 transition w-full">
                    <span className="block md:hidden">Edit</span>
                    <span className="hidden md:block">Edit the text</span>
                  </button>
                </Link>
                <Link to={`/pastes/${paste?._id}`}>
                  <button className="text-white font-bold border-2 border-black text-sm px-2 py-1 bg-green-500 rounded-md hover:bg-green-400 transition w-full">
                    <span className="block md:hidden">View</span>
                    <span className="hidden md:block">View the text</span>
                  </button>
                </Link>
                <button
                  className="text-white font-bold border-2 border-black text-sm px-2 py-1 bg-gray-500 rounded-md hover:bg-gray-400 transition w-full"
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to clipboard!");
                  }}
                >
                  <span className="block md:hidden">Copy</span>
                  <span className="hidden md:block">Copy the text</span>
                </button>
                <button
                  className="text-white font-bold border-2 border-black text-sm px-2 py-1 bg-red-500 rounded-md hover:bg-red-400 transition w-full"
                  onClick={() => handleDelete(paste?._id)}
                >
                  <span className="block md:hidden">Delete</span>
                  <span className="hidden md:block">Delete the text</span>
                </button>
                <button
                  className="text-white font-bold border-2 border-black text-sm px-2 py-1 bg-purple-500 rounded-md hover:bg-purple-400 transition w-full col-span-2 md:col-span-1"
                  onClick={() => generateShareLink(paste?._id)}
                >
                  <span className="block md:hidden">Share</span>
                  <span className="hidden md:block">Share the text</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-300 text-center py-4">No matching pastes found.</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
