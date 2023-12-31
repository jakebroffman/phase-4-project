import React, { useContext } from 'react';
import SignInPage from './SignInPage';
import UserContext from './UserContext';

function SignOutPage() {

  const { setIsLoggedIn, isLoggedIn, setCurrentUser, currentUser } = useContext(UserContext);

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
        } else {
          console.error('Failed to log out');
          console.log(currentUser)
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
        <p>Farewell! We hope to see you again soon.</p>
        <button onClick={handleLogOutClick}>Log Out</button>
      </>
      ) : (
       <SignInPage />
      )}
    </div>
  );
}

export default SignOutPage;
<SignInPage />