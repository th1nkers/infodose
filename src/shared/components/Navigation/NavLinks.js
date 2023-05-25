import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {
  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact>ALL USERS</NavLink>
    </li>
    <li>
      <NavLink to="/u1/docs">MY DOCS</NavLink>
    </li>
    <li>
      <NavLink to="/docs/new">ADD DOC</NavLink>
    </li>
    <li>
      <NavLink to="/auth">AUTHENTICATE</NavLink>
    </li>
  </ul>
};

export default NavLinks;