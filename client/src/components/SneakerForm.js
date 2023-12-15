import React, { useState, useContext } from 'react';
import SneakersContext from './SneakersContext';

function SneakerForm({ onSubmit }) {
  const { setSneakers } = useContext(SneakersContext);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    size: '',
    condition: '',
    photo_url: '',
  });

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
      const response = await fetch('/sneakers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newSneaker = await response.json();
        setSneakers((prevSneakers) => [...prevSneakers, newSneaker]);
        console.log('Sneaker added successfully!');
      } else {
        console.error('Failed to add sneaker to the database');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setFormData({
      brand: '',
      model: '',
      size: '',
      condition: '',
      photo_url: '',
    });
  };

  return (
    <form className="sign-up-form" onSubmit={handleSubmit}>
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
      <button type="submit" className="form-button">
        Submit
      </button>
    </form>
  );
}

export default SneakerForm;
