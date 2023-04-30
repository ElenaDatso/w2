import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.scss';

function Header() {
  return (
    <div>
      <h1>TheLibrary</h1>
      <nav>
        <ul className={classes.menuList}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? classes.active : classes.link)}
            >
              Main
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? classes.active : classes.link)}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/form"
              className={({ isActive }) => (isActive ? classes.active : classes.link)}
            >
              Form
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
