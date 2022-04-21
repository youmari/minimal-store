import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProductToCart } from '../../Redux/Cart/cart';

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
      product: {
        id, name, gallery, prices,
      },
      symbol,
    } = this.props;
    const { isThereAttributes } = this.state;
    return (
      <article key={id}>
        <Link to={id}>
          <img
            style={{ width: 200, display: 'block' }} // I will remove it later
            src={gallery[0]}
            alt={name}
          />
          {isThereAttributes && (
            <strong style={{ color: 'red' }}>
              Please Click on the item and try to choose attributes then add it
              to the cart !
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
        <button
          type="button"
          onClick={() => {
            this.handleAddProductToCart(id);
          }}
        >
          add to cart
        </button>
      </article>
    );
  }
}

const mapDispatchToProps = {
  addProductToCart,
};

export default connect(null, mapDispatchToProps)(ProductItem);
