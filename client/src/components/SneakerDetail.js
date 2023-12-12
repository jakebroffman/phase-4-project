import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import SneakersContext from './SneakersContext';

function SneakerDetail() {
  const { id } = useParams();
  const { sneakers } = useContext(SneakersContext);

  const sneaker = sneakers.find((s) => s.id === parseInt(id));

  if (!sneaker) {
    return <p>Loading...</p>;
  }

  return (
    <div className="sneaker-detail">
      <h2>{sneaker.brand} - {sneaker.model}</h2>
      <p>Size: {sneaker.size}</p>
      <p>Condition: {sneaker.condition}</p>
      <img src={sneaker.photo_url} alt={`${sneaker.brand} ${sneaker.model}`} />

      <div>
        <h3 className="reviews-heading">Reviews</h3>
        {sneaker.reviews.map((review) => (
          <div key={review.id} className="review-card">
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SneakerDetail;



