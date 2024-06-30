import React from 'react';
import { NavLink } from 'react-router-dom';
import { Logo, ReferIcon } from '../assets/export';
import '../assets/styles/navbar.css';

const Navbar = ({ currentUser }) => {
  return (
    <div className="navbar-container">
      <NavLink to='/' className='left-navbar-container'>
        <img src={Logo} alt="DcodeBlock-Logo" className="navbar-logo" />
      </NavLink>

      <div>
        <NavLink to={currentUser ? '/' : '/login'} className='right-navbar-container'>
          <img src={ReferIcon} alt="Refer-Icon" className="refer-btn-icon" />
          <p className="refer-btn-text">Refer & Earn</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
