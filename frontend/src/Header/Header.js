import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; 

const Header = () => {

    const navigate = useNavigate();

  // Check if user is logged in by looking for userId and token in localStorage
  const userId = localStorage.getItem('uid');
  const token = localStorage.getItem('token');
  

  // Logout function
  const logout = () => {
    localStorage.removeItem('uid');
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    navigate('/login'); // Redirect to login page after logout
  };
  return (
    <header className="header">
      <div className="logo">LIVEr</div> {/* Logo on the left */}
      <nav className="menu">
        <ul>
          <li><a href="/homepage">Home</a></li>
          {!userId || !token ? (
            <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li><a href="/signup">SignUp</a></li>
            </>
          ) : (
            // Show "Logout" button if user is logged in
            <li>
              <span style={{ cursor: 'pointer', color: 'inherit',fontSize:'18px' }} onClick={logout}>
                Logout
              </span>
            </li>
          )}
          
        </ul>
      </nav> {/* Menu on the right */}
    </header>
  );
};

export default Header;
