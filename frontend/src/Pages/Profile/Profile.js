import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchAndUpdateUser } from '../../Services/auth/authAPI';
import { Card,Form,Input,Button, Row, Col, Spin } from 'antd';
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
    
    if (user) {
      setFormData({
        id:user.id,
        name: user.name || ' ',
        email: user.email || ' ',
        address: user.address || ' ',
        contact: user.contact || ' ',
      });
    }
  
}, [user]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    //e.preventDefault();
    setIsSubmitting(true);
  
    // Basic validation
    if (!formData.name || !formData.email) {
      alert("Name and Email are required.");
      setIsSubmitting(false);
      return;
    }
  
    try {
      await fetchAndUpdateUser(formData);
      console.log("User updated successfully!");
      alert("User updated successfully!");
    } catch (err) {
      console.error("Failed to update user:", err.message || err);
      alert("Failed to update user. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
   
   <div style={{backgroundColor: "#FAF9F6",}}>
    <Row justify="center" align="middle" style={{ minHeight: '80vh' }}>
      <Col xs={24} sm={18} md={12} lg={8}>
        <Card bordered={false} style={{ padding: '20px' }}>
          <h1 style={{ textAlign: 'center' }}>{user ? 'Edit Profile' : 'Create Profile'}</h1>
          <Spin spinning={isSubmitting}>
            <Form
              layout="vertical"
              initialValues={formData}
              onFinish={handleSubmit}
            >
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
            // style={{marginRight:"12px"}}
            placeholder="Enter contact"
            required
          />
        </div>
              <Form.Item>
              <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '50%' }}
                loading={isSubmitting}
                disabled={isSubmitting}
                >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
              </Form.Item>
            </Form>
          </Spin>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        </Card>
      </Col>
    </Row>
    </div>
  );
};
export default ProfilePage;
