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
          <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          <Routes>
            <Route path="/" element={<HomePage isLoggedIn = {isLoggedIn}/>} />
            <Route path="/sneakers" element={<SneakerPage isLoggedIn = {isLoggedIn}/>} />
            <Route path="/signup" element={<SignUpPage isLoggedIn = {isLoggedIn}/>} />
            <Route path="/signin" element={<SignInPage setCurrentUser = {setCurrentUser} setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path="/sneakers/:id" element={<SneakerDetail isLoggedIn = {isLoggedIn}/>} />
            <Route path="/signout" element={<SignOutPage setIsLoggedIn = {setIsLoggedIn} isLoggedIn={isLoggedIn} setCurrentUser={setCurrentUser}/>} />
          </Routes>
        </UserContext.Provider> 
      </div>
    </Router>
  );
}

export default App;


