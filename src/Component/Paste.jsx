import React, { useState, useMemo, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removePaste } from "../Redux/PasteSlice";
import toast from "react-hot-toast";
import { CiAlarmOn } from "react-icons/ci";
import { toggleReminder } from "../Redux/PasteSlice";
import { Link } from "react-router-dom";
import { Themecontext } from "../App";

import { FaEdit, FaEye, FaTrash, FaCopy, FaShareAlt } from "react-icons/fa";

const Paste = () => {
  const dispatch = useDispatch();
  const [searchItem, setSearchItem] = useState("");
  const pastes = useSelector((state) => state.Paste?.pastes ?? []);
  const { theme } = useContext(Themecontext);

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
      className={`p-6 md:p-12 min-h-screen flex flex-col items-center transition-all duration-300 ${
        theme === "dark" ? "bg-black text-white" : "bg-gray-50 text-black"
      }`}
    >
      {/* Search Bar */}
      <div className="w-full max-w-md">
        <input
          className="w-full p-3 border border-gray-400 rounded-md focus:ring-2  shadow-sm bg-white text-black"
          type="search"
          placeholder="Search Tasks..."
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </div>

      {/* Paste List */}
      <div className="mt-4 w-full max-w-5xl grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className={`shadow-lg rounded-xl p-4 flex flex-col gap-3 transition-all duration-300 ${
                theme === "dark"
                  ? "bg-[#1e1e1e] text-white"
                  : "bg-white text-black"
              } hover:scale-[1.02] hover:shadow-2xl`}
            >
              <div>
                <h2 className="text-xl font-semibold truncate mb-1 flex justify-between items-center">
                  <span className="truncate">{paste.title}</span>
                  <span
                    className={`cursor-pointer text-2xl transition duration-300 ${
                      paste.isReminderEnabled
                        ? "text-yellow-400"
                        : "text-gray-400"
                    }`}
                    onClick={() => dispatch(toggleReminder(paste._id))}
                    title={
                      paste.isReminderEnabled
                        ? "Reminder is ON. Click to turn OFF."
                        : "Reminder is OFF. Click to turn ON."
                    }
                  >
                    <CiAlarmOn />
                  </span>
                </h2>

                <p className="text-sm text-gray-500 truncate mb-1">
                  {paste.content}
                </p>
                <span className="text-xs text-gray-400">
                  {new Date(paste.createdAt).toLocaleString()}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between gap-2 mt-2">
                <Link to={`/?tasksId=${paste?._id}`}>
                  <button
                    className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white p-2 rounded-lg shadow-md transition"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                </Link>
                <Link to={`/tasks/${paste?._id}`}>
                  <button
                    className="bg-green-500 cursor-pointer hover:bg-green-600 text-white p-2 rounded-lg shadow-md transition"
                    title="View"
                  >
                    <FaEye />
                  </button>
                </Link>
                <button
                  className="bg-gray-500 cursor-pointer hover:bg-gray-600 text-white p-2 rounded-lg shadow-md transition"
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to clipboard!");
                  }}
                  title="Copy"
                >
                  <FaCopy />
                </button>
                <button
                  className="bg-red-500 cursor-pointer hover:bg-red-600 text-white p-2 rounded-lg shadow-md transition"
                  onClick={() => handleDelete(paste?._id)}
                  title="Delete"
                >
                  <FaTrash />
                </button>
                <button
                  className="bg-purple-500 cursor-pointer hover:bg-purple-600 text-white p-2 rounded-lg shadow-md transition"
                  onClick={() => generateShareLink(paste?._id)}
                  title="Share"
                >
                  <FaShareAlt />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full">
            No matching tasks found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Paste;
