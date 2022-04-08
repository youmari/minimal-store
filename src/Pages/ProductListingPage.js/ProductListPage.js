import React, { Component } from 'react';
import { Route, Routes } from 'react-router';
import NavBar from '../../Components/Navbar/NavBar';
import ProductList from '../../Components/ProductList/ProductList';

export default class ProductListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: localStorage.getItem('symbol') || '$',
    };
  }

  handleOnChange = (event) => {
    const { value } = event.target;
    this.setState({ symbol: value });
    localStorage.setItem('symbol', value);
  };

  handleCurrencyOnLoad = () => {
    const elem = document.querySelector('.select');
    elem.value = localStorage.getItem('symbol');
  };

  render() {
    window.addEventListener('load', this.handleCurrencyOnLoad);
    const { symbol } = this.state;
    return (
      <>
        <NavBar onChangeCurrency={this.handleOnChange} />
        <Routes>
          <Route exact element={<ProductList symbol={symbol} />} path="/" />
          <Route
            exact
            element={<ProductList symbol={symbol} category="tech" />}
            path="/tech"
          />
          <Route
            exact
            element={<ProductList symbol={symbol} category="clothes" />}
            path="/clothes"
          />
        </Routes>
      </>
    );
  }
}
