import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProductToCart } from '../../Redux/Cart/cart';

class ProductItem extends Component {
  constructor(props) {
    super(props);
  }

  handleAddProductToCart = (id) => {
    const {addProductToCart} = this.props
    addProductToCart(id)
  };

  render() {
    const { product, symbol } = this.props;
    return (
      <article key={product.id}>
        <img
          style={{ width: 200 }} // I will remove it later
          src={product.gallery[0]}
          alt={product.name}
        />
        <button type="button" onClick={() => {this.handleAddProductToCart(product.id)}}>
          add to cart
        </button>
        <h4>{product.name}</h4>
        {product.prices.map(
          (price) =>
            price.currency.symbol === symbol && (
              <strong key={price.currency.symbol}>
                {price.currency.symbol}
                {price.amount}
              </strong>
            ),
        )}
      </article>
    );
  }
}

const mapDispatchToProps = {
  addProductToCart,
};

export default connect(null, mapDispatchToProps)(ProductItem);
