// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Importing auth from firebase.js

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User logged in: ', user);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('token', user.accessToken);
      localStorage.setItem('uid', user.uid);
      

      navigate('/homepage'); // Redirect to homepage

    } catch (error) {
      console.error('Error logging in: ', error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
