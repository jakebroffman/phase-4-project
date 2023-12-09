import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import SneakerPage from './components/SneakerPage';
import SignUpPage from './components/SignUpPage';
import SignInPage from "./components/SignInPage";
import SneakerDetail from "./components/SneakerDetail"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/sneakers" element={<SneakerPage isLoggedIn = {isLoggedIn}/>} />
          <Route path="/signup" element={<SignUpPage/>} />
          <Route path="/signin" element={<SignInPage/>} />
          <Route path="/sneakers/:id" element={<SneakerDetail/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


