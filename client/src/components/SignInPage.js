import React, { useState } from 'react';


function SignInPage( {isLoggedIn, setCurrentUser} ) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleFormSubmit = (e) => {
    e.preventDefault();

    
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => 
        {setCurrentUser(data);
    })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="sign-in">

        <div className="sign-in-form">
          <h2>Sign In</h2>
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

