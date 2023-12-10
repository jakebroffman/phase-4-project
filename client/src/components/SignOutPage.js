import React from 'react';

function SignOutPage({ setIsLoggedIn }) {
  const handleLogOutClick = () => {
    fetch('/logout', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          setIsLoggedIn(false);
        } else {
          console.error('Failed to log out');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="sign-out">
      <p>Farewell! We hope to see you again soon.</p>
      <button onClick={handleLogOutClick}>Log Out</button>
    </div>
  );
}

export default SignOutPage;
