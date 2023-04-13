import React from 'react';
import { ReactComponent as Logo } from 'assets/logo.svg';
import {Link, useNavigate} from 'react-router-dom';
import { FaHome, FaWrench, FaBriefcase, FaHeadset, FaSignOutAlt } from 'react-icons/fa';
import './style.css';

const Sidebar = ({ onSelection, setIsLoggedIn }) => {
  const handleItemClick = (item) => {
    onSelection(item);
  };

  const navigate = useNavigate();

  const signOut = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="sidebar">
      <div className="logo-container">
        <Link to={"/"}><Logo /></Link>
      </div>

      <ul>
        <li onClick={() => handleItemClick('home')}><div className="icon" ><FaHome /></div><div className="item-name">Home</div></li>
        <li onClick={() => handleItemClick('portfolio')}><div className="icon" ><FaBriefcase /></div><div className="item-name">Portfolio</div></li>
        <li onClick={() => handleItemClick('setting')}><div className="icon" ><FaWrench /></div><div className="item-name">Setting</div></li>
        <li onClick={() => handleItemClick('support')}><div className="icon" ><FaHeadset /></div><div className="item-name">Support</div></li>
      </ul>
      <ul className="signout">
        <li onClick={signOut}><div className="icon" ><FaSignOutAlt /></div><div className="item-name">Sign Out</div></li>
      </ul>
    </div>
  );
};

export default Sidebar;
