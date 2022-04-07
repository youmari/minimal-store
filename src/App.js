import React, { Component } from 'react';
import NavBar from './Components/Navbar/NavBar';

class App extends Component {
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
      </>
    );
  }
}
export default App;
