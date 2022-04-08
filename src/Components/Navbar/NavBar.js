import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ onChangeCurrency }) => (
  <>
    <NavLink
      to="/"
      // className={({ isActive }) => (isActive ? activeLinkStyles : linkStyles)}
    >
      All
    </NavLink>
    <NavLink
      to="/tech"
      // className={({ isActive }) => (isActive ? activeLinkStyles : linkStyles)}
    >
      tech
    </NavLink>
    <NavLink
      to="/clothes"
      // className={({ isActive }) => (isActive ? activeLinkStyles : linkStyles)}
    >
      clothes
    </NavLink>
    <select className="select" onChange={onChangeCurrency}>
      <option value="$">$ USD</option>
      <option value="£">£ GBP</option>
      <option value="¥">¥ JPY</option>
      <option value="₽">₽ RUB</option>
      <option value="A$">A$ AUD</option>
    </select>
  </>
);

export default NavBar;
