import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './HomePage';
import SneakerPage from './SneakerPage';
import SignUpPage from './SignUpPage';
import SignInPage from "./SignInPage";
import SneakerDetail from "./SneakerDetail"
import SignOutPage from "./SignOutPage";
import UserContext from "./UserContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({
    id: null,
    username: '',
    email: '',
    profile_photo_url: '',
    reviews: [],
  });
  
  useEffect(() => {
    if (currentUser !== null && currentUser !== undefined) {
      console.log(currentUser)
      setIsLoggedIn(true);
    }
  }, [currentUser, setIsLoggedIn]);

  return (
    <Router>
      <div>
        <UserContext.Provider value ={{currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn}}>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sneakers" element={<SneakerPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/sneakers/:id" element={<SneakerDetail />} />
            <Route path="/signout" element={<SignOutPage />} />
          </Routes>
        </UserContext.Provider> 
      </div>
    </Router>
  );
}

export default App;


