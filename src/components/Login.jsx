// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      setErrorMessage('Username and password are required.');
      return;
    }

    if (typeof setUser === 'function') { // Ensure setUser is a function
      setUser({ username }); // Set the user state with username (or user data)
      navigate('/dashboard'); // Redirect to the Home page
    } else {
      console.error("setUser is not a function");
    }
  };

  return (
    <div className="login-page">
      <h2>Sign In</h2>
      <div className="login-form">
        <input
          type="text"
          placeholder="Username"
          aria-label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          aria-label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Sign In</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Login;