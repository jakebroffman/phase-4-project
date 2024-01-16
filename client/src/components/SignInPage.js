import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';

function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setIsLoggedIn, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setErrorMessage('');

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCurrentUser(data);
        setIsLoggedIn(true);
        sessionStorage.setItem('isLoggedIn', true);
        sessionStorage.setItem('currentUser', JSON.stringify(data));

        navigate('/');
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('Incorrect username or password');
      });
  };

  return (
    <div className="sign-in">
      <div className="form">
        <h2>Sign In</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
