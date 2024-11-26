// src/components/Profile.js
import React, { useState } from 'react';

function Profile({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: user?.username || 'Guest',
    dateOfBirth: '1990-01-01',
    paypal: 'user@paypal.com',
    creditCard: '**** **** **** 1234',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEditClick = () => {
    setIsEditing(true);
    setSuccessMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSave = () => {
    // Basic validation
    if (!profileData.username || !profileData.paypal || !profileData.creditCard) {
      setErrorMessage('All fields are required.');
      return;
    }

    setIsEditing(false);
    setErrorMessage('');
    setSuccessMessage('Profile updated successfully!');
    // In a real app, you would also save the updated data to a backend here
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-card">
        <div className="profile-details">
          <label>
            <strong>Name:</strong>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={profileData.username}
                onChange={handleInputChange}
              />
            ) : (
              <span>{profileData.username}</span>
            )}
          </label>
          <label>
            <strong>Date of Birth:</strong>
            {isEditing ? (
              <input
                type="date"
                name="dateOfBirth"
                value={profileData.dateOfBirth}
                onChange={handleInputChange}
              />
            ) : (
              <span>{profileData.dateOfBirth}</span>
            )}
          </label>
          <label>
            <strong>PayPal:</strong>
            {isEditing ? (
              <input
                type="email"
                name="paypal"
                value={profileData.paypal}
                onChange={handleInputChange}
              />
            ) : (
              <span>{profileData.paypal}</span>
            )}
          </label>
          <label>
            <strong>Credit Card:</strong>
            {isEditing ? (
              <input
                type="text"
                name="creditCard"
                value={profileData.creditCard}
                onChange={handleInputChange}
              />
            ) : (
              <span>{profileData.creditCard}</span>
            )}
          </label>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <div className="profile-actions">
          {isEditing ? (
            <>
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            <button className="edit-button" onClick={handleEditClick}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;