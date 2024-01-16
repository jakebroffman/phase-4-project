import React, { useState, useContext, useEffect } from 'react';
import SneakersContext from './SneakersContext';

function ReviewForm({ sneakerId, editReviewData, onCancel }) {
  const { setSneakers } = useContext(SneakersContext);
  const [formData, setFormData] = useState({
    rating: '',
    comment: '',
    sneaker_id: sneakerId, 
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editReviewData) {
      setFormData({
        rating: String(editReviewData.rating),
        comment: editReviewData.comment,
        sneaker_id: sneakerId, 
      });
    }
  }, [editReviewData, sneakerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'sneaker_id') {
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    try {
      const url = editReviewData
        ? `/reviews/${editReviewData.id}`
        : `/sneakers/${sneakerId}/reviews`;
  
      const method = editReviewData ? 'PATCH' : 'POST';
  
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const updatedReview = await response.json();
  
        setSneakers((prevSneakers) =>
          prevSneakers.map((sneaker) =>
            sneaker.id === sneakerId
              ? {
                  ...sneaker,
                  reviews: editReviewData
                    ? sneaker.reviews.map((review) =>
                        review.id === updatedReview.id ? updatedReview : review
                      )
                    : [...sneaker.reviews, updatedReview],
                }
              : sneaker
          )
        );
  
        setFormData({
          rating: '',
          comment: '',
          sneaker_id: sneakerId,
        });
  
        onCancel();
  
        console.log('Review added/updated successfully!');
      } else {
        const errorData = await response.json();
        if (response.status === 422) {
          const validationErrors = errorData.errors;
          setError(Object.values(validationErrors).join(', '));
        } else {
          setError(errorData.message || 'Failed to add/update review');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred.');
    } finally {
    }
  };

  return (
    <div>
      {error && (
        <div className="error-container">
          <p className="error-message">Error:</p>
          <ul className="error-list">
            {error.split(', ').map((errorMsg, index) => (
              <li key={index} className="error-item">
                {errorMsg}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form className="review-form" onSubmit={handleSubmit}>
        <input type="hidden" name="sneaker_id" value={sneakerId} readOnly />
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
          {editReviewData ? 'Update Review' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;
