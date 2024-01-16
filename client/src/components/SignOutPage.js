import React, { useContext } from 'react';
import SignInPage from './SignInPage';
import UserContext from './UserContext';

function SignOutPage() {
  const { setIsLoggedIn, isLoggedIn, setCurrentUser } = useContext(UserContext);

  const handleLogOutClick = () => {
    fetch('/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          setIsLoggedIn(!isLoggedIn);
          setCurrentUser(null);
          sessionStorage.removeItem('isLoggedIn');
          sessionStorage.removeItem('currentUser');
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
      {isLoggedIn ? (
        <>
          <p className="farewell-message">Farewell! We hope to see you again soon.</p>
          <button className="logout-button" onClick={handleLogOutClick}>
            Log Out
          </button>
        </>
      ) : (
        <SignInPage />
      )}
    </div>
  );
}

export default SignOutPage;
