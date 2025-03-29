import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removePaste } from "../Redux/PasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
 

const Paste = () => {
  const dispatch = useDispatch();
  const [searchItem, setSearchItem] = useState("");

  const pastes = useSelector((state) => state.Paste?.pastes ?? []);

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
    <div className="p-4 bg-purple-500  min-h-screen flex flex-col items-center">
      <div className="w-full max-w-md">
        <input
          className="w-full p-3 border border-white bg-white text-black rounded-md focus:ring-2 focus:ring-white shadow-sm"
          type="search"
          placeholder="Search pastes..."
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </div>

      <div className="mt-4 w-full max-w-lg text-center space-y-4">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="bg-white shadow-md rounded-lg p-3 flex flex-col gap-2"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {paste.title}
                </h2>
                <p className="text-gray-600 text-sm truncate">{paste.content}</p>
                <span className="text-gray-400 text-xs">
                  {new Date(paste.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <Link to={`/?pasteId=${paste?._id}`}>
                  <button className="text-white bg-blue-600 border-2 border-blue-700 text-sm px-2 py-1 rounded-md hover:bg-blue-500 transition w-full">
                    Edit
                  </button>
                </Link>
                <Link to={`/pastes/${paste?._id}`}>
                  <button className="text-white bg-green-600 border-2 border-green-700 text-sm px-2 py-1 rounded-md hover:bg-green-500 transition w-full">
                    View
                  </button>
                </Link>
                <button
                  className="text-white bg-gray-600 border-2 border-gray-700 text-sm px-2 py-1 rounded-md hover:bg-gray-500 transition w-full"
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to clipboard!");
                  }}
                >
                  Copy
                </button>
              </div>

              {/* Centered Delete and Share buttons */}
              <div className="flex justify-center gap-3 mt-2">
                <button
                  className="text-white bg-red-600 border-2 border-red-700 text-sm px-12 py-1 rounded-md hover:bg-red-500 transition"
                  onClick={() => handleDelete(paste?._id)}
                >
                  Delete
                </button>
                <button
                  className="text-white bg-purple-700 border-2 border-purple-800 text-sm px-12 py-1 rounded-md hover:bg-purple-600 transition"
                  onClick={() => generateShareLink(paste?._id)}
                >
                  Share
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-200 text-center py-4">No matching pastes found.</p>
        )}
      </div>
    </div>
  );
};

export default Paste;