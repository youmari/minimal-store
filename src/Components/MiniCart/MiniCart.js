import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MiniCart.style.css';

class Minicart extends Component {
  totalPrice = () => {
    const { cart, symbol } = this.props;
    let total = 0;
    cart.forEach((item) => {
      item.prices.forEach((price) => {
        if (price.currency.symbol === symbol) {
          total += price.amount * item.quantity;
        }
      });
    });
    return `${symbol}${total.toFixed(2)}`;
  };

  render() {
    const { setIsOpen, cart, symbol } = this.props;
    return (
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
                  <button className="quantity-btn" type="button">
                    +
                  </button>
                  <p>{item.quantity}</p>
                  <button className="quantity-btn" type="button">
                    -
                  </button>
                </div>
                <img
                  className="item-picture"
                  src={item.gallery[0]}
                  alt={item.name}
                />
              </article>
            ))}
          </div>
          <div className="total-container">
            <p>Total</p>
            <p>{this.totalPrice()}</p>
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    cartReducer: { cart },
  } = state;
  return { cart };
};

export default connect(mapStateToProps, null)(Minicart);
