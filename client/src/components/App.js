import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './HomePage';
import SneakerPage from './SneakerPage';
import SignUpPage from './SignUpPage';
import SignInPage from "./SignInPage";
import SneakerDetail from "./SneakerDetail";
import SignOutPage from "./SignOutPage";
import UserProfile from "./UserProfile";
import MyReviewsPage from "./MyReviewsPage";
import UserContext from "./UserContext";
import SneakersContext from "./SneakersContext";

function App() {

  const { setIsLoggedIn, setCurrentUser } = useContext(UserContext);
  const { setSneakers } = useContext(SneakersContext);

  useEffect(() => {
    fetch('/check-authentication')
    .then((r) => {
      
      if (r.ok) {
        r.json().then(user => 
        {setCurrentUser(user)
        setIsLoggedIn(true)}) 
      }
      else{ 
        r.json()
        .then(error => console.log(error))
      }
    })
  

    fetch('/sneakers')
      .then((r) => r.json())
      .then((data) => {
        setSneakers(data);
      });
  }, []); 
  
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sneakers" element={<SneakerPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/sneakers/:id" element={<SneakerDetail />} />
          <Route path="/signout" element={<SignOutPage />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/myreviews" element={<MyReviewsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
