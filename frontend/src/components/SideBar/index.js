import React from 'react';
import { ReactComponent as Logo } from 'assets/logo.svg';
import {Link} from 'react-router-dom';
import './style.css';



const Sidebar = ({ onSelection }) => {
  const handleItemClick = (item) => {
    onSelection(item);
  };

  return (
    <div className="sidebar">
      <ul>
        <Link to = {"/"}><li><Logo/></li></Link>
        <li onClick={() => handleItemClick('home')}>Home</li>
        <li onClick={() => handleItemClick('trade')}>Trade</li>
        <li onClick={() => handleItemClick('portfolio')}>Portfolio</li>
        <li onClick={() => handleItemClick('support')}>Support</li>
      </ul>
      <ul className="signout">
        <li onClick={() => handleItemClick('signout')}>Sign Out</li>
      </ul>
    </div>
  );
};

export default Sidebar;
