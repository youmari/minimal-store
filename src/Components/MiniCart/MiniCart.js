import React, { Component } from 'react';

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
    return (
      <div>
        minicart
      </div>
    );
  }
}

export default Minicart;
