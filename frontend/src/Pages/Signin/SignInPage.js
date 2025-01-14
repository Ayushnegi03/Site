import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn, signUp } from '../../Services/auth/authAPI';
import { useNavigate } from 'react-router-dom';
import './SignInPge.css';
import { notification, Spin } from 'antd';
import { SIGN_IN_SUCCESS } from '../../Redux/auth/authSlice';
const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
//  const [admin,setAdmin]= useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [role,setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSwitch = () => {
    setIsSignUp((prev) => !prev);
    setError(null);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };
  const handleRoleChange = async (newRole) => {
    setRole(newRole);
    if (newRole === 1) {
      notification.info({
        message: 'Admin Role Selected',
        description: 'Admins have elevated permissions.',
      });
    }
    else{
      notification.info({
        message: 'User Role Selected',
        description: 'User have elevated permissions.',
      });
    }


    
  
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    // if (role === 'admin')
    // {
    //   notification.success({
    //     message: 'You switch to admin mode',
    //     description: 'Please sign up to continue.',
    //   });

    // }
    if (isSignUp && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      // const payload = {
      //   email,
      //   password,
      //   ...(isSignUp && { username, role }), // Include role only for signup
      // };
      const response = isSignUp
        ? await signUp({ username , email,password,...({ username, role }) })
        : await signIn({ email, password });
      //console.log(response)
      if (response?.data?.token || response?.data?.user) {
        if (isSignUp) {
          //localStorage.setItem('token', response?.data?.token);
          notification.success({
            message: 'Sign Up Successful',
            description: 'Please sign in to continue.',
          });
          setIsSignUp(false);
        } else {
          dispatch(SIGN_IN_SUCCESS({ user: response.data.user }));
          notification.success({
            message: 'Login Successful',
            description: `Welcome back, ${response.data.user.username}!`,
          });
          navigate('/');
        }
      } else {
        setError('Authentication failed. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="sign-in-container">
      <div className='auth-form-container'>
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      {error && <p className="error-message" role="alert">{error}</p>}
      <form onSubmit={handleSubmit} aria-live="polite">
       {isSignUp && (
        
        <div className="radio">
                <label htmlFor="role">Role:</label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={role === 0}
                    onChange={() => handleRoleChange(0)}
                  />
                  User
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={role === 1}
                    onChange={() => handleRoleChange(1)}
                  />
                  Admin
                </label>
              </div>
      )} 
      {isSignUp && (
        
          <div className="form-group">
            <label htmlFor="confirmPassword">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {isSignUp && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}
        <button
          type="submit"
          className="submit-button"
          disabled={loading}
          style={{ background: '#3a3d3b', color: '#FFFFFF'}}
        >
          {loading ? <Spin size="small" /> : isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>
      <hr />
      <button onClick={handleSwitch} className="submit-button" style={{ background: '#3a3d3b', color: '#FFFFFF'}}>
        {isSignUp
          ? 'Switch to  Sign In'
          : "Switch to  Sign Up"}
      </button>
      </div>
    </div>
  );
};
export default AuthForm;
