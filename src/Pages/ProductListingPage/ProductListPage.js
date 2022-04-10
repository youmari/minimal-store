import React, { Component } from 'react';
import { Route, Routes, useParams } from 'react-router';
import NavBar from '../../Components/Navbar/NavBar';
import ProductList from '../../Components/ProductList/ProductList';
import ProdctDescriptionPage from '../ProductDescriptionPage/ProdctDescriptionPage';

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
    const ParamsWrapper = () => {
      const { productId } = useParams();
      return <ProdctDescriptionPage symbol={symbol} productId={productId} />;
    };
    return (
      <>
        <NavBar onChangeCurrency={this.handleOnChange} />
        <Routes>
          <Route element={<ProductList symbol={symbol} />} path="all" />
          <Route
            element={<ProductList symbol={symbol} category="tech" />}
            path="tech"
          />
          <Route
            element={<ProductList symbol={symbol} category="clothes" />}
            path="clothes"
          />
          <Route element={<ParamsWrapper />} path=":category/:productId" />
        </Routes>
      </>
    );
  }
}
