import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const SignIn = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  // const signUp = async (email, password, firstName, lastName) => {
  //   const response = await fetch("http://127.0.0.1:8000/signup", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ email, password, first_name: firstName, last_name: lastName }),
  //   });
  //   return await response.json();
  // };

  const signUp = async (email, password, firstName, lastName) => {
    const response = await fetch("http://127.0.0.1:8000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, first_name: firstName, last_name: lastName }),
    });
    return await response.json();
  };

  // const signIn = async (email, password) => {
  //   const response = await fetch("http://127.0.0.1:8000/signin", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ email, password }),
  //   });
  //   return await response.json();
  // };

  const signIn = async (email, password) => {
    const response = await fetch("http://127.0.0.1:8000/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      // Call your sign up function from the backend
      const response = await signUp(email, password, firstName, lastName);
      if (response.user_id) {
        // Navigate to the dashboard
        setIsLoggedIn(true);
        navigate('/dashboard', { state: { userId: response.user_id } });
      } else {
        // Handle sign up error
        window.alert("Failed to sign up. Please try again.");
      }
    } else {
      // Call your sign in function from the backend
      const response = await signIn(email, password);
      if (response.user_id) {
        // Navigate to the dashboard
        setIsLoggedIn(true);
        navigate('/dashboard', { state: { userId: response.user_id } });
      } else {
        window.alert("Failed to sign in. Please try again.");
      }
    }
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="signin-container">
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </>
        )}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
      </form>
      <p>
        {isSignUp
          ? 'Already have an account?'
          : "Don't have an account?"}
        <button className="toggle-btn" onClick={toggleSignUp}>
          {isSignUp ? 'Sign In' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
};

export default SignIn;
