import React from 'react';

const NavBar = ({ onChangeCurrency }) => (
  <select className="select" onChange={onChangeCurrency}>
    <option value="$"> $ USD</option>
    <option value="£"> £ GBP</option>
    <option value="¥"> ¥ JPY</option>
  </select>
);

export default NavBar;
