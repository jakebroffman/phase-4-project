import React, { useState, useContext, useEffect } from 'react';
import SneakersContext from './SneakersContext';

function ReviewForm({ sneakerId, editReviewData, onCancel }) {
  const { setSneakers } = useContext(SneakersContext);
  const [formData, setFormData] = useState({
    rating: '',
    comment: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Set form data with values from the editReviewData when editing
    if (editReviewData) {
      setFormData({
        rating: String(editReviewData.rating),
        comment: editReviewData.comment,
      });
    }
  }, [editReviewData]);

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
        });

        onCancel(); // Close the form

        console.log('Review added/updated successfully!');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add/update review');
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
          {editReviewData ? 'Update Review' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;
