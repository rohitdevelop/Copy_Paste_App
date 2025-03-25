import React from 'react';
import './App.css'
import {Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Home from './Component/Home';
import Paste from './Component/Paste';
import ViewPaste from './Component/ViewPaste';

const App = () => {
  return (     
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pastes" element={<Paste />} />
        <Route path="/pastes/:id" element={<ViewPaste />} /> {/* ✅ Dynamic route */}
      </Routes>
    </>
  );
};

export default App;
