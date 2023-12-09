import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SneakerDetail() {
  const { id } = useParams();
  const [sneaker, setSneaker] = useState(null);

  useEffect(() => {

    fetch(`/sneakers/${id}`)
      .then((response) => response.json())
      .then((data) => setSneaker(data))
  }, [id]);

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
            <h4>User: {review.user}</h4>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SneakerDetail;



