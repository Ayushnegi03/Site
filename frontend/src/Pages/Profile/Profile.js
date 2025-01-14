import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchAndUpdateUser } from '../../Services/auth/authAPI';
import { Card } from 'antd';
const ProfilePage = () => {
  const { user, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    contact: '',  
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    // console.log('user',user)
    if (user) {
      setFormData({
        id:user.id,
        name: user.name || ' ',
        email: user.email || ' ',
        address: user.address || ' ',
        contact: user.contact || ' ',
      });
    }
  else {
    setFormData({
      name: 'John Doe',
      email: 'johndoe@example.com',
      address: '123 Main Street, Hometown',
      contact: '1234567890',
    });
  }
}, [user]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetchAndUpdateUser(formData);
      console.log('User updated successfully!');
    } catch (err) {
      console.error('Failed to update user:', err);
      // Optionally, handle the error differently if needed
    } finally {
      setIsSubmitting(false); // Always reset submitting state
    }
  };
  return (
    <Card>
      <h1>{user ? 'Edit Profile' : 'Create Profile'}</h1>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact:</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Enter contact"
            required
          />
        </div>
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </Card>
  );
};
export default ProfilePage;
