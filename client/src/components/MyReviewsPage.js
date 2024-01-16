import React, { useContext } from 'react';
import UserContext from './UserContext';
import SneakersContext from './SneakersContext';

function MyReviewsPage() {
  const { currentUser } = useContext(UserContext);
  const { sneakers } = useContext(SneakersContext);

 

  if (!currentUser || !currentUser.id) {
    console.log('User not logged in or ID not available.');
    return null;
  }

  const userReviews = sneakers
  .flatMap((sneaker) => sneaker.reviews || [])
  .filter((review) => {
    return review.user_id === currentUser.id;
  });


  const reviewElements = userReviews.map((review) => {
    const matchingSneaker = sneakers.find((sneaker) => sneaker.id === review.sneaker_id) || {};
  
    return (
      <div key={review.id} className="review-card">
        <h3>{matchingSneaker.brand || 'Unknown Brand'} - {matchingSneaker.model || 'Unknown Model'}</h3>
        <p>Rating: {review.rating}</p>
        <p>Comment: {review.comment}</p>
        {matchingSneaker.photo_url && (
          <img
            src={matchingSneaker.photo_url}
            alt={`${matchingSneaker.brand || 'Unknown Brand'} ${matchingSneaker.model || 'Unknown Model'}`}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        )}
      </div>
    );
  });
  




  return (
    <div>
      <h2 className="sneaker-page-heading">My Reviews:</h2>
      <div className="review-list">
        {reviewElements}
      </div>
    </div>
  );
}

export default MyReviewsPage;
