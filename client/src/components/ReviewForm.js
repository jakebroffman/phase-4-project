import React, { useState, useContext } from 'react';
import SneakersContext from './SneakersContext';

function ReviewForm({ sneakerId }) {
  const { setSneakers } = useContext(SneakersContext);
  const [formData, setFormData] = useState({
    rating: '',
    comment: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/sneakers/${sneakerId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newReview = await response.json();
        setSneakers((prevSneakers) =>
          prevSneakers.map((sneaker) =>
            sneaker.id === sneakerId
              ? { ...sneaker, reviews: [...sneaker.reviews, newReview] }
              : sneaker
          )
        );
        setFormData({
            rating: '',
            comment: '',
          });
        console.log('Review added successfully!');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add review to the database');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div>
      {error && <p className="error-message">{error}</p>}
      <form className="review-form" onSubmit={handleSubmit}>
        <label>
          Rating:
            <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="1"
                max="5"
                className="form-input"
            />
        </label>
        <label>
          Comment:
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <button type="submit" className="form-button">
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;
