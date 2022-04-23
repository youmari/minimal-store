import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProductToCart } from '../../Redux/Cart/cart';
import whiteCartIcon from '../../Assets/whiteCartIcon.svg';
import './ProductItem.style.css';

class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isThereAttributes: false,
    };
  }

  handleAddProductToCart = (id) => {
    const {
      addProductToCart,
      product: { attributes },
    } = this.props;
    if (attributes.length) {
      this.setState({ isThereAttributes: true });
      return true;
    }
    addProductToCart(id);
    return true;
  };

  render() {
    const {
      product:
      {
        id, name, gallery, prices, inStock,
      },
      symbol,
    } = this.props;
    const { isThereAttributes } = this.state;
    return (
      <article className="product-item" key={id}>
        {!inStock && <span className="out-of-stock">OUT OF STOCK</span>}
        <div className={!inStock ? 'product-link product-overlay' : 'product-link'}>
          <Link to={id}>
            <img
              style={{ width: 200, display: 'block' }} // I will remove it later
              src={gallery[0]}
              alt={name}
            />
            {isThereAttributes && (
              <strong style={{ color: 'red' }}>
                Please Click on the item and try to choose attributes then add
                it to the cart !
              </strong>
            )}
            <h4>{name}</h4>
          </Link>
          {prices.map(
            (price) => price.currency.symbol === symbol && (
            <strong key={price.currency.symbol}>
              {price.currency.symbol}
              {price.amount}
            </strong>
            ),
          )}
        </div>
        <button
          type="button"
          className="main-product-btn"
          onClick={() => {
            this.handleAddProductToCart(id);
          }}
        >
          <img src={whiteCartIcon} alt="cart" />
        </button>
      </article>
    );
  }
}

const mapDispatchToProps = {
  addProductToCart,
};

export default connect(null, mapDispatchToProps)(ProductItem);
