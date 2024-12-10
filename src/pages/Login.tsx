// src/pages/login.tsx
import React, { useState } from 'react';
import { signIn } from '../lib/auth/auth'; // Import the signIn function

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async () => {
    try {
      const { session, user } = await signIn(email, password);
      console.log('Signed in successfully', user);
      // You can use a state or a store to set the user and session
      // For example, using a global store or context to save session and user info.
    } catch (error) {
      console.error('Sign-in failed:', error);
      setErrorMessage(error.message || 'Something went wrong');
    }
  };

  return (
    <div className="login-container">
      <h2>Sign In</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default LoginPage;
