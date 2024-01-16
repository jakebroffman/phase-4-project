import React, { useState, useContext, useEffect } from 'react';
import SneakersContext from './SneakersContext';
import UserContext from './UserContext';

function SneakerForm({ sneakerToEdit, onCancel }) {
  const { setSneakers } = useContext(SneakersContext);
  const { currentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    size: '',
    condition: '',
    photo_url: '',
    user_id: currentUser.id,
  });
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    if (sneakerToEdit) {
      setFormData({
        brand: sneakerToEdit.brand,
        model: sneakerToEdit.model,
        size: sneakerToEdit.size,
        condition: sneakerToEdit.condition,
        photo_url: sneakerToEdit.photo_url,
        user_id: sneakerToEdit.user_id || currentUser.id,
      });
    }
  }, [sneakerToEdit, currentUser.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSuccess = (updatedSneaker) => {
    setLoading(false);
    setFormData({
      brand: '',
      model: '',
      size: '',
      condition: '',
      photo_url: '',
      user_id: currentUser.id,
    });

    setSneakers((prevSneakers) => {
      if (sneakerToEdit) {
        return prevSneakers.map((sneaker) =>
          sneaker.id === updatedSneaker.id ? updatedSneaker : sneaker
        );
      } else {
        return [...prevSneakers, updatedSneaker];
      }
    });

    setSignupSuccess(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessages([]);

    try {
      const isEditing = sneakerToEdit && sneakerToEdit.id;
      const url = isEditing ? `/sneakers/${sneakerToEdit.id}` : '/sneakers';
      const method = isEditing ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, user_id: currentUser.id }),
      });

      if (response.ok) {
        const updatedSneaker = await response.json();
        handleSuccess(updatedSneaker);
        console.log('Sneaker added/updated successfully!');
      } else {
        const errorData = await response.json();
        if (response.status === 422) {
          const validationErrors = errorData.errors;
          setErrorMessages(Object.values(validationErrors));
        } else {
          setErrorMessages([errorData.message || 'Failed to add/update sneaker to the database']);
        }
      }
    } catch (error) {
      setErrorMessages(['An unexpected error occurred.']);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {signupSuccess ? (
        <div className="success-message">
          <p>Sneaker added/updated successfully!</p>
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Brand:
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="form-input"
            />
          </label>

          <label>
            Model:
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="form-input"
            />
          </label>

          <label>
            Size:
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="form-input"
            />
          </label>

          <label>
            Condition:
            <input
              type="text"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="form-input"
            />
          </label>

          <label>
            Photo URL:
            <input
              type="text"
              name="photo_url"
              value={formData.photo_url}
              onChange={handleChange}
              className="form-input"
            />
          </label>

          {errorMessages.length > 0 && (
            <div className="error-container">
              <p className="error-message">Error:</p>
              <ul className="error-list">
                {errorMessages.map((errorMsg, index) => (
                  <li key={index} className="error-item">
                    {errorMsg}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button type="submit" className="form-button" disabled={loading}>
            {loading ? 'Loading...' : sneakerToEdit ? 'Update' : 'Submit'}
          </button>

          {sneakerToEdit && (
            <button type="button" onClick={onCancel} className="form-button" disabled={loading}>
              Cancel
            </button>
          )}
        </form>
      )}
    </div>
  );
}

export default SneakerForm;
