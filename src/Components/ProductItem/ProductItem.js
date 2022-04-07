import React, { Component } from 'react';

class Productitem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <article key={product.id}>
        <img
          style={{ width: 200 }} // I will remove it later
          src={product.gallery[0]}
          alt={product.name}
        />
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

export default Productitem;
