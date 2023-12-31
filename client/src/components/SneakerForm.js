import React, { useState, useContext, useEffect } from 'react';
import SneakersContext from './SneakersContext';
import UserContext from './UserContext';

function SneakerForm({ onSubmit, sneakerToEdit, onCancel }) {
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
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const handleSuccess = () => {
    setIsFormVisible(false);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const url = sneakerToEdit ? `/sneakers/${sneakerToEdit.id}` : '/sneakers';
      const method = sneakerToEdit ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, user_id: currentUser.id }),
      });

      if (response.ok) {
        const updatedSneaker = await response.json();

        setSneakers((prevSneakers) =>
          prevSneakers.map((sneaker) =>
            sneaker.id === updatedSneaker.id ? updatedSneaker : sneaker
          )
        );

        handleSuccess();
        console.log('Sneaker added/updated successfully!');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add/update sneaker to the database');
      }
    } catch (error) {
      setError('An unexpected error occurred.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="sneaker-form" onSubmit={handleSubmit}>
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
      {error && <p className="error-message">{error}</p>}
      <button type="submit" className="form-button" disabled={loading}>
        {loading ? 'Loading...' : sneakerToEdit ? 'Update' : 'Submit'}
      </button>
      {sneakerToEdit && (
        <button type="button" onClick={onCancel} className="form-button" disabled={loading}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default SneakerForm;
