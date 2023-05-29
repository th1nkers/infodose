import React from 'react';
import { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

import './NavLinks.css';

const NavLinks = props => {

  const auth = useContext(AuthContext);
  const redirectHandler = () => {
    auth.logout()
  }

  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact>ALL USERS</NavLink>
    </li>
    {auth.isLoggedIn && (<li>
      <NavLink to="/u1/docs">MY DOCS</NavLink>
    </li>)}
    {auth.isLoggedIn && (<li>
      <NavLink to="/docs/new">ADD DOC</NavLink>
    </li>)}
    {!auth.isLoggedIn && (<li>
      <NavLink to="/auth">AUTHENTICATE</NavLink>
    </li>)}
    {auth.isLoggedIn && (<li>
      <Link to="/auth" onClick={redirectHandler}>Logout</Link>
    </li>)}
  </ul>
};

export default NavLinks;