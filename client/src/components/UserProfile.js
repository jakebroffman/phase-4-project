import React, { useState, useContext } from 'react';
import UserContext from './UserContext';

function UserProfile() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser.username || '',
    email: currentUser.email || '',
    profile_photo_url: currentUser.profile_photo_url || '',
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    fetch(`/users/${currentUser.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to update profile');
        }
      })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };

  return (
    <div className="profile">
      <h2>Profile</h2>
      <div className="profile-card">
        <img src={currentUser.profile_photo_url} alt="Profile" />
        <p>Username: {currentUser.username}</p>
        <p>Email: {currentUser.email}</p>
      </div>
      {isEditing ? (
        <div>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Profile Photo URL:
            <input
              type="text"
              name="profile_photo_url"
              value={formData.profile_photo_url}
              onChange={handleChange}
            />
          </label>
          <br />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleEditClick}>Edit Profile</button>
      )}
    </div>
  );
}

export default UserProfile;
