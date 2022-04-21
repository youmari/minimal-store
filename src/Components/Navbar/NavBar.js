import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import cartIcon from '../../Assets/cartIcon.svg';
import Minicart from '../MiniCart/MiniCart';

const NavBar = ({ onChangeCurrency, symbol }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
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
      <button
        onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
        className="cart-btn"
        type="button"
      >
        <img src={cartIcon} alt="cart icon" />
      </button>
      {isOpen && <Minicart symbol={symbol} setIsOpen={setIsOpen} />}
    </>
  );
};

export default NavBar;
