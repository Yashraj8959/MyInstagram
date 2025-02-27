import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = ({ children }) => {
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Simulate an asynchronous token validation (replace with actual logic)
    setTimeout(() => {
      if (!token) {
        Navigate('/login');
      }
      setIsLoading(false); // Set loading to false after validation
    }, 500); // Simulated delay
  }, [Navigate, token]);

  if (isLoading) {
    return <div>Loading...</div>; // Display loading indicator
  }

  return children;
};

export default Protected;