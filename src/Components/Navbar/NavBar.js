import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import cartIcon from '../../Assets/cartIcon.svg';
import Minicart from '../MiniCart/MiniCart';
import './NavBar.style.css';
import logo from '../../Assets/logo.svg';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  setIsOpen = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen } = this.state;
    const {
      onChangeCurrency, symbol, numberOfItems, totalPrice,
    } = this.props;
    return (
      <header>
        <nav>
          <ul className="navigation-container">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'activeLinkStyles' : 'linkStyles')}
              >
                All
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tech"
                className={({ isActive }) => (isActive ? 'activeLinkStyles' : 'linkStyles')}
              >
                Tech
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/clothes"
                className={({ isActive }) => (isActive ? 'activeLinkStyles' : 'linkStyles')}
              >
                Clothes
              </NavLink>
            </li>
          </ul>
        </nav>
        <a className="logo" href="/">
          <img src={logo} alt="logo" />
        </a>
        <div className="currencies-cart-and-container">
          <select className="currencies-select" onChange={onChangeCurrency}>
            <option value="$">$ USD</option>
            <option value="£">£ GBP</option>
            <option value="¥">¥ JPY</option>
            <option value="₽">₽ RUB</option>
            <option value="A$">A$ AUD</option>
          </select>
          <button
            onClick={() => (isOpen
              ? this.setState({ isOpen: false })
              : this.setState({ isOpen: true }))}
            className="cart-btn"
            type="button"
          >
            <img src={cartIcon} alt="cart icon" />
            <span>{numberOfItems}</span>
          </button>
          {isOpen && (
          <Minicart
            totalPrice={totalPrice}
            symbol={symbol}
            setIsOpen={this.setIsOpen}
          />
          )}
        </div>
      </header>
    );
  }
}

export default NavBar;
