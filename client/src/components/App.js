import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './HomePage';
import SneakerPage from './SneakerPage';
import SignUpPage from './SignUpPage';
import SignInPage from "./SignInPage";
import SneakerDetail from "./SneakerDetail";
import SignOutPage from "./SignOutPage";
import UserContext from "./UserContext";
import SneakersContext from "./SneakersContext";
import UserProfile from "./UserProfile";

function App() {
  const initialIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const initialCurrentUser = JSON.parse(localStorage.getItem('currentUser')) || {};

  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  const [currentUser, setCurrentUser] = useState(initialCurrentUser);
  const [sneakers, setSneakers] = useState([]);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch('/check-authentication');
        if (response.ok) {
          const user = await response.json();
          return user;
        } else {
          throw new Error('Authentication check failed');
        }
      } catch (error) {
        throw new Error('Authentication check failed');
      }
    };

    checkAuthentication()
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('currentUser', JSON.stringify(user));
      })
      .catch(() => {
        setIsLoggedIn(false);
        setCurrentUser({});
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
      });

    fetch('/sneakers')
      .then((r) => r.json())
      .then((data) => {
        console.log("Sneakers API Response:", data);
        setSneakers(data);
      });
  }, []);
  
  useEffect(() => {
    if (
      currentUser &&
      Object.values(currentUser).every((value) => value !== null && value !== undefined && value !== "")
    ) {
      console.log(currentUser);
      setIsLoggedIn(true);
    }
  }, [currentUser, setIsLoggedIn]);

  return (
    <Router>
      <div>
        <SneakersContext.Provider value ={{sneakers, setSneakers}}>
          <UserContext.Provider value ={{currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn}}>
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/sneakers" element={<SneakerPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/sneakers/:id" element={<SneakerDetail />} />
              <Route path="/signout" element={<SignOutPage />} />
              <Route path="/userprofile" element={<UserProfile />} />
            </Routes>
          </UserContext.Provider>
        </SneakersContext.Provider>
      </div>
    </Router>
  );
}

export default App;


