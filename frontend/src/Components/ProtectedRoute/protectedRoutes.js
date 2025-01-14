import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { notification } from 'antd';

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');

  // If no token is found, redirect to the login page
  if (!token) {
   
      notification.error({
          message: ' Please Sign in first',
          description: `Sign In first`,
        });
     
    return <Navigate to="/" replace />;
  }

  // If token exists, render the children
  return children;
};

export default ProtectedRoute;
