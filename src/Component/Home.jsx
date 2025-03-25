import React, { useEffect, useState,useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPaste } from '../Redux/PasteSlice';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');

  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.Paste?.pastes ?? []);
  const pastesMemoized = useMemo(() => allPastes, [allPastes]);
  

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
      return alert('Title and content cannot be empty!');
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

    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          {pasteId ? 'Update Paste' : 'Create My Paste'}
        </h1>

        {/* Title Input */}
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-200"
          type="text"
          value={title}
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Content Textarea */}
        <textarea
          className="w-full h-40 mt-4 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-200 resize-none"
          value={value}
          placeholder="Enter content..."
          onChange={(e) => setValue(e.target.value)}
        />

        {/* Button */}
        <button
          className="w-full mt-5 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition-all duration-300 shadow-md"
          onClick={createOrUpdatePaste}
        >
          {pasteId ? 'Update Paste' : 'Create My Paste'}
        </button>
      </div>
    </div>
  );
};

export default Home;


 