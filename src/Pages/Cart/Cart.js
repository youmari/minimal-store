import React, { Component } from 'react';
import { connect } from 'react-redux';
import { decrementAnItem, incrementAnItem, removeProductFromCart } from '../../Redux/Cart/cart';
import './Cart.style.css';
import delIcon from '../../Assets/delIcon.png';

class Cart extends Component {
  render() {
    const {
      cart,
      symbol,
      numberOfItems,
      totalPrice,
      incrementAnItem,
      decrementAnItem,
      removeProductFromCart,
    } = this.props;
    return (
      <section className="main-cart-page">
        <h1>CART</h1>
        <div>
          {cart?.map((item) => (
            <article key={item.id} className="Cart-item">
              <div>
                <h4 className="c-brand-name">{item.brand}</h4>
                <h5 className="c-item-name">{item.name}</h5>
                {item.prices.map(
                  (price) =>
                    price.currency.symbol === symbol && (
                      <div key={price.currency.symbol}>
                        <p className="c-price">
                          {price.currency.symbol}
                          {price.amount}
                        </p>
                      </div>
                    ),
                )}
                <ul className="c-attributes-container">
                  {item.attributes.map((attribute) => (
                    <li key={attribute.id}>
                      <h4>{attribute.name}:</h4>
                      {attribute.name === 'Color' ? (
                        <span
                          key={attribute.id}
                          style={{ backgroundColor: `${attribute.value}` }}
                          className="c-color-attribute"
                        />
                      ) : (
                        <div key={attribute.id} className="other-radio-btns">
                          <span className="other-checkmark">
                            {attribute.value}
                          </span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="c-btns-and-img-con">
                <div>
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
                <img src={item.gallery[0]} alt={item.name} />
              </div>
              <button
                className="c-delete-btn"
                type="button"
                onClick={() => removeProductFromCart(item.cartId)}
              >
                <img
                  id="c-delete-icon"
                  src={delIcon}
                  alt="delete icon"
                />
              </button>
            </article>
          ))}
          <div className="c-tax-qty-total">
            <div className="c-tax">
              <h5>Tax 21%:</h5>
              <p>
                {symbol}
                42.00
              </p>
            </div>
            <div>
              <h5>Quantity:</h5>
              <p>{numberOfItems}</p>
            </div>
            <div>
              <h5>Total:</h5>
              <p>{totalPrice}</p>
            </div>
          </div>
          <button className="add-to-cart-btn" type="button">
            ORDER
          </button>
        </div>
      </section>
    );
  }
}
const mapDispatchToProps = {
  incrementAnItem,
  decrementAnItem,
  removeProductFromCart,
};

export default connect(null, mapDispatchToProps)(Cart);
