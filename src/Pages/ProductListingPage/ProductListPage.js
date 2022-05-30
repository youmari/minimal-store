import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Routes, useParams } from 'react-router';
import NavBar from '../../Components/Navbar/NavBar';
import ProductList from '../../Components/ProductList/ProductList';
import Cart from '../Cart/Cart';
import ProdctDescriptionPage from '../ProductDescriptionPage/ProdctDescriptionPage';

class ProductListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: localStorage.getItem('symbol') || '$',
    };
  }

  totalPrice = () => {
    const { cart } = this.props;
    const { symbol } = this.state;
    let total = 0;
    let numberOfItems = 0;
    cart.forEach((item) => {
      numberOfItems += item.quantity;
      item.prices.forEach((price) => {
        if (price.currency.symbol === symbol) {
          total += price.amount * item.quantity;
        }
      });
    });
    return [`${symbol}${total.toFixed(2)}`, numberOfItems];
  };

  handleOnChange = (event) => {
    const { value } = event.target;
    this.setState({ symbol: value });
    localStorage.setItem('symbol', value);
  };

  handleCurrencyOnLoad = () => {
    const elem = document.querySelector('.currencies-select');
    elem.value = localStorage.getItem('symbol');
  };

  render() {
    const { cart } = this.props;
    const [totalPrice, numberOfItems] = this.totalPrice();
    window.addEventListener('load', this.handleCurrencyOnLoad);
    const { symbol } = this.state;
    const ParamsWrapper = () => {
      const { productId } = useParams();
      return <ProdctDescriptionPage symbol={symbol} productId={productId} />;
    };
    return (
      <>
        <NavBar
          numberOfItems={numberOfItems}
          totalPrice={totalPrice}
          onChangeCurrency={this.handleOnChange}
          symbol={symbol}
        />
        <Routes>
          <Route element={<ProductList symbol={symbol} />} path="/" />
          <Route
            element={<ProductList symbol={symbol} category="tech" />}
            path="tech"
          />
          <Route
            element={<ProductList symbol={symbol} category="clothes" />}
            path="clothes"
          />
          <Route element={<ParamsWrapper />} path="/:productId" />
          <Route element={<ParamsWrapper />} path=":category/:productId" />
          <Route
            element={(
              <Cart
                cart={cart}
                symbol={symbol}
                numberOfItems={numberOfItems}
                totalPrice={totalPrice}
              />
            )}
            path="/Cart"
          />
        </Routes>
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

export default connect(mapStateToProps, null)(ProductListPage);
