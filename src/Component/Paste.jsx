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
    <div className="p-12 md:p-12 bg-purple-500 min-h-screen flex flex-col items-center">
      {/* Search Bar */}
      <div className="w-full max-w-md">
        <input
          className="w-full p-3 border border-white bg-white text-black rounded-md focus:ring-2 focus:ring-white shadow-sm"
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

              {/* Action Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <Link to={`/?pasteId=${paste?._id}`}>
                  <button className="text-white font-bold border-2 border-black text-sm px-2 py-1 bg-blue-500 rounded-md hover:bg-blue-400 transition w-full">
                    <span className="block md:hidden">Edit</span>
                  
                    <span className="hidden md:block">Edit the text</span>
                
                  </button>
                </Link>
                <Link to={`/pastes/${paste?._id}`}>
                  <button className="text-white border-2 font-bold  border-black text-sm px-2 py-1 bg-green-500 rounded-md hover:bg-green-400 transition w-full">
                  <span className="block md:hidden">view</span>
                  <span className="md:block hidden">view the text</span>
                  </button>
                </Link>
                <button
                  className="text-white border-2 font-bold  border-black text-sm px-2 py-1 bg-gray-500 rounded-md hover:bg-gray-400 transition w-full"
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to clipboard!");
                  }}
                >
               <span className="block md:hidden">Copy</span>
               <span className="md:block hidden">Copy the text</span>
                </button>
                <button
                  className="text-white border-2 font-bold  border-black text-sm px-2 py-1 bg-red-500  rounded-md hover:bg-red-400 transition w-full"
                  onClick={() => handleDelete(paste?._id)}
                >
                 <span className="block md:hidden">Delete</span>
                 <span className="md:block hidden">Delete the text</span>
                </button>
                <button
                  className="text-white border-2 font-bold  border-black text-sm px-2 py-1 bg-purple-500 rounded-md hover:bg-purple-400 transition w-full col-span-2 md:col-span-1"
                  onClick={() => generateShareLink(paste?._id)}
                >
                   <span className="block md:hidden">Share</span>
                   <span className="md:block hidden">Share the text</span>
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