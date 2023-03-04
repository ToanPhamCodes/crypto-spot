import React from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';
import './NavBar.css'
function Navbar() {

  return (

      <nav>
        <div className="logo">
          <Logo />
        </div>
      <div className="menu">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Sign in</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
