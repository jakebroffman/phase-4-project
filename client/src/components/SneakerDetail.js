import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import SneakersContext from './SneakersContext';
import ReviewForm from './ReviewForm';
import UserContext from './UserContext';

function SneakerDetail() {
  const { id } = useParams();
  const { sneakers } = useContext(SneakersContext);
  const { currentUser } = useContext(UserContext);

  const sneaker = sneakers.find((s) => s.id === parseInt(id));

  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [editReviewData, setEditReviewData] = useState(null);

  const toggleReviewForm = (review) => {
    setIsReviewFormVisible(!isReviewFormVisible);
    setIsEditFormVisible(false); 
    setEditReviewData(review);
  };

  const toggleEditForm = (review) => {
    setIsEditFormVisible(!isEditFormVisible);
    setIsReviewFormVisible(false); 
    setEditReviewData(review);
  };

  if (!sneaker) {
    return <p>Loading...</p>;
  }

  return (
    <div className="sneaker-detail">
      <h2>{sneaker.brand} - {sneaker.model}</h2>
      <p>Size: {sneaker.size}</p>
      <p>Condition: {sneaker.condition}</p>
      <img src={sneaker.photo_url} alt={`${sneaker.brand} ${sneaker.model}`} />

      <button onClick={() => toggleReviewForm(null)}>Leave A Review</button>

      {isReviewFormVisible && (
        <ReviewForm
          sneakerId={sneaker.id}
          editReviewData={null}
          onCancel={() => setIsReviewFormVisible(false)}
        />
      )}

      <div>
        <h3 className="reviews-heading">Reviews</h3>
        {sneaker.reviews.map((review) => (
          <div key={review.id} className="review-card">
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
            {currentUser && currentUser.id === review.user_id && (
              <div>
                <button onClick={() => toggleEditForm(review)}>Edit</button>
                {isEditFormVisible && editReviewData && editReviewData.id === review.id && (
                  <ReviewForm
                    sneakerId={sneaker.id}
                    editReviewData={editReviewData}
                    onCancel={() => setIsEditFormVisible(false)}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SneakerDetail;
