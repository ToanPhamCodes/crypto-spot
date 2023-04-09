import React from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';

import './style.css'
import { useRef } from "react";
import {Link} from 'react-router-dom';
import {HashLink} from 'react-router-hash-link';
function Navbar() {

  return (

        <nav>
            <div className="logo">
             <Link to = {"/"}> <Logo /></Link >
            </div>

          <div className="menu">
            <ul>
              <li>
                <Link to = "/">Home</Link>
              </li>
              <li>
                <Link>About</Link>
              </li>
              <li>
                <HashLink to = "/#Contact">Contact</HashLink>
              </li>
              <li>
                <Link to = "/SignIn">Sign In</Link>
              </li>
            </ul>

          </div>
        </nav>
  );
}

export default Navbar;
