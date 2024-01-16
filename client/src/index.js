import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import UserContext from './components/UserContext';
import SneakersContext from './components/SneakersContext';

const RootComponent = () => {
  const [sneakers, setSneakers] = useState([]); 
  const [currentUser, setCurrentUser] = useState({}); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <React.StrictMode>
      <SneakersContext.Provider value={{ sneakers, setSneakers }}>
        <UserContext.Provider value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}>
          <App />
        </UserContext.Provider>
      </SneakersContext.Provider>
    </React.StrictMode>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<RootComponent />);

reportWebVitals();
