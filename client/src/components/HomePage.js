import React, { useContext } from 'react';
import UserContext from './UserContext';

function HomePage() {
  const { currentUser, isLoggedIn } = useContext(UserContext);

  return (
    <div className="home-page-container">
      {isLoggedIn ? (
        <div className="welcome-section">
          <h2 className="welcome-heading">Welcome to Sneaker World, {currentUser.username}!</h2>
          <p className="welcome-text">
            Sneaker World is a community built for sneaker enthusiasts by sneaker enthusiasts. Together we can come together
            to find the latest in the ever-changing world of sneakers and collecting. Create an account, join the community,
            stay up to date on new and limited releases, leave reviews for other members to check out and decide whether or not
            they want to add them to their collection. Future expansions will allow users to track their collection as well as
            buy, sell, and trade with other Sneaker World members!
          </p>
        </div>
      ) : (
        <div className="visit-section">
          <h2 className="visit-heading">Thanks for visiting Sneaker World!</h2>
          <p className="visit-text">
            Please log in or sign up if you don't have an account with us to access the Sneaker World community!
          </p>
        </div>
      )}
    </div>
  );
}

export default HomePage;
