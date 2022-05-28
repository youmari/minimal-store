import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import './MiniCart.style.css';
import {
  incrementAnItem,
  decrementAnItem,
  removeProductFromCart,
} from '../../Redux/Cart/cart';
import delIcon from '../../Assets/delIcon.png';

class Minicart extends Component {
  render() {
    const {
      setIsOpen,
      cart,
      symbol,
      totalPrice,
      incrementAnItem,
      decrementAnItem,
      removeProductFromCart,
    } = this.props;
    return ReactDOM.createPortal(
      <>
        <section className="mini-cart">
          <h3 className="mini-cart-title">
            <strong>
              My Bag.
              {' '}
              {cart.length}
              {cart.length === 1 ? ' item' : ' items'}
            </strong>
          </h3>
          <div className="items-container">
            {cart.map((item) => (
              <article key={item.id} className="item">
                <div className="item-info">
                  <h4 className="brand-name">{item.brand}</h4>
                  <h5 className="item-name">{item.name}</h5>
                  {item.prices.map(
                    (price) => price.currency.symbol === symbol && (
                    <div key={price.currency.symbol}>
                      <p>
                        {price.currency.symbol}
                        {price.amount}
                      </p>
                    </div>
                    ),
                  )}
                  <div className="item-attributes-container">
                    {item.attributes.map((attribute) => (
                      <span
                        key={attribute.value}
                        className="mini-cart-attribute"
                      >
                        {attribute.value}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="qty-bts-container">
                  <button
                    className="quantity-btn"
                    type="button"
                    onClick={() => incrementAnItem(item.cartId)}
                  >
                    +
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    className="quantity-btn"
                    type="button"
                    onClick={() => decrementAnItem(item.cartId)}
                  >
                    -
                  </button>
                </div>
                <img
                  className="item-picture"
                  src={item.gallery[0]}
                  alt={item.name}
                />
                <button
                  className="mini-delete-icon"
                  type="button"
                  onClick={() => removeProductFromCart(item.cartId)}
                >
                  <img src={delIcon} alt="delete icon" />
                </button>
              </article>
            ))}
          </div>
          <div className="total-container">
            <p>Total</p>
            <p>{totalPrice}</p>
          </div>
          <div className="mini-cart-action-btns-container">
            <button type="button" className="view-bag-btn">
              VIEW BAG
            </button>
            <button type="button" className="checkout-btn">
              CHECKOUT
            </button>
          </div>
        </section>
        <div
          aria-hidden="true"
          onClick={() => setIsOpen()}
          className="overlay"
        />
      </>,
      document.getElementById('portal'),
    );
  }
}

const mapStateToProps = (state) => {
  const {
    cartReducer: { cart },
  } = state;
  return { cart };
};

const mapDispatchToProps = {
  incrementAnItem,
  decrementAnItem,
  removeProductFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Minicart);
