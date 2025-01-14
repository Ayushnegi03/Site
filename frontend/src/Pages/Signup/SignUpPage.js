import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../../Services/auth/authAPI';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { SIGN_UP_SUCCESS } from '../../Redux/auth/authSlice';


import './SignUpPage.css'; 

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
 
 
  const handleSignUp = async(e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        notification.error({
            message: ' please fill password correctly',
            description: `password not match,try again`,
          });
        return;
    }
    const response = await signUp({ username, email, password });
    if (response?.data?.user) {
        dispatch(SIGN_UP_SUCCESS( { user:response.data.user} ));  
        notification.success({
          message: 'Sign Up Successful',
          description: `Welcome, ${response.data.user.username}!`,
        });}
  
        
        navigate('/signin');    
    }

  return (
    <div className="sign-up-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Sign Up
        </button>
      </form>
      <hr/>
      





    </div>
  );
};

export default SignUpPage;
