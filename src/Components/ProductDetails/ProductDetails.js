import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Productattribute from '../ProductAttribute/ProductAttribute';
class Productdetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attributes: [],
      checker: new Set(),
    };
  }

  handleAttributeOnChange = (event) => {
    const { name, value } = event.target;
    if (!this.state.checker.has(name)) {
      this.setState((state) => state.checker.add(name));
      this.setState({
        attributes: [...this.state.attributes, { name: name, value: value }],
      });
    } else {
      this.setState((state) => {
        return state.attributes.map((attribute) => {
          if (attribute.name === name) {
            attribute.value = value;
          }
  attributesNeeded = () => {
    const {
      product: { attributes },
    } = this.props;
    const { checker } = this.state;
    return attributes.filter((item) => !checker.has(item.name));
  };
  handleAddToCArtOnClick = () => {
    const {
      product,
      product: { inStock, id },
      addProductToCart,
    } = this.props;
    const { attributes } = this.state;
    const numberOfAttributes = product.attributes.length;
    if (numberOfAttributes !== attributes.length) {
      this.setState((state) => (state.isThereAttributes = true));
    } else {
      if (!inStock) return;
      this.setState((state) => (state.isThereAttributes = false));
      addProductToCart(id, attributes);
    }
  };

  render() {
    const { product, symbol } = this.props;
    return (
      <section>
        <div>
          <h2>{product.brand}</h2>
          <h3>{product.name}</h3>
          <div>
            {product?.attributes.map((attribute) => (
              <Productattribute
                handleAttributeOnChange={this.handleAttributeOnChange}
                key={attribute.id}
                attribute={attribute}
              />
            ))}
          </div>
          {product.prices.map(
            (price) =>
              price.currency.symbol === symbol && (
                <div key={price.currency.symbol}>
                  <h4>Price:</h4>
                  <h3>
                    {price.currency.symbol}
                    {price.amount}
                  </h3>
                </div>
              ),
          )}
          <button className="add-to-cart-btn" type="button">
            ADD TO CART
          </button>
          <div>{ReactHtmlParser(product.description)}</div>
        </div>
      </section>
    );
  }
}

export default Productdetails;
