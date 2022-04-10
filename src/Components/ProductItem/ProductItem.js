import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProductToCart } from '../../Redux/Cart/cart';

class ProductItem extends Component {
  constructor(props) {
    super(props);
  }

  handleAddProductToCart = (id) => {
    const { addProductToCart } = this.props;
    addProductToCart(id);
  };

  render() {
    const { product, symbol } = this.props;
    return (
      <article key={product.id}>
        <Link to={product.id}>
          <img
            style={{ width: 200 }} // I will remove it later
            src={product.gallery[0]}
            alt={product.name}
          />
          <h4>{product.name}</h4>
        </Link>
        {product.prices.map(
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
            this.handleAddProductToCart(product.id);
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
