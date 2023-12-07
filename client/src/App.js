import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import SneakerPage from './components/SneakerPage';
import SignUpPage from './components/SignUpPage';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/sneakers" element={<SneakerPage/>} />
          <Route path="/signup" element={<SignUpPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


