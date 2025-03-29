import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.Paste?.pastes ?? []);

  // Find the paste efficiently
  const paste = useMemo(() => allPastes.find((p) => p._id === id), [allPastes, id]);

  if (!paste) {
    return <p className="text-center text-gray-500">Loading paste...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-[90vh] bg-purple-500 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">{paste.title}</h2>

        <textarea
          className="w-full h-40 p-4 border border-gray-300 rounded-lg shadow-sm resize-none bg-gray-200"
          value={paste.content}
          disabled
        />
      </div>
    </div>
  );
};

export default ViewPaste;
