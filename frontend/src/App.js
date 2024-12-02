import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter as Router, useNavigate, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import ProductPage from './pages/ProductPage';
import './App.css';
import Header from './Header/Header'

//check if user is logged in
const checkLoginStatus = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

// Private Route Component
const PrivateRoute = ({ element }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    console.log("check",localStorage.getItem('isLoggedIn'))
    const checkAuth = checkLoginStatus();
    setIsAuthenticated(checkAuth);

    if (!checkAuth) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [navigate]);

  if (isAuthenticated === null) {
    return null; // Loading state or nothing until the authentication check is done
  }

  return element; // Return the protected element if authenticated
};

// App Component with Routes
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  return (
    
    <Router>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:productId" element={<ProductPage />} />

        {/* Private Routes */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/homepage" /> : <Login />}
        />
        <Route path="/homepage" element={<PrivateRoute element={<Homepage />} />} />
        
      </Routes>
    </Router>
  );
};

export default App;
