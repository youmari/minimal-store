import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import { addProductToCart } from '../../Redux/Cart/cart';
import Productattribute from '../ProductAttribute/ProductAttribute';

class Productdetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attributes: [],
      checker: new Set(),
      isThereAttributes: false,
    };
  }

  handleAttributeOnChange = (event) => {
    const { checker } = this.state;
    const { name, value } = event.target;
    if (!checker.has(name)) {
      this.setState((state) => state.checker.add(name));
      this.setState({
        attributes: [...this.state.attributes, { name, value }],
      });
    } else {
      this.setState((state) =>
        state.attributes.map((attribute) => {
          if (attribute.name === name) {
            attribute.value = value;
          }
        }),
      );
    }
  };

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
    const {
      product: { brand, name, inStock, attributes, prices, description },
      symbol,
    } = this.props;
    const { isThereAttributes } = this.state;
    return (
      <section>
        <div>
          <h2>{brand}</h2>
          <h3>{name}</h3>
          {!inStock && (
            <strong style={{ color: 'red' }}>
              This product is not avaiable at the moment
            </strong>
          )}
          <div>
            {isThereAttributes && (
              <ul>
                {this.attributesNeeded().map((item) => (
                  <li key={item.id} style={{ color: 'red' }}>
                    <strong>
                      {item.name} is not selected, Please try to choose one
                    </strong>
                  </li>
                ))}
              </ul>
            )}
            {attributes.map((attribute) => (
              <Productattribute
                handleAttributeOnChange={this.handleAttributeOnChange}
                key={attribute.id}
                attribute={attribute}
              />
            ))}
          </div>
          {prices.map(
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
          <button
            className="add-to-cart-btn"
            type="button"
            onClick={this.handleAddToCArtOnClick}
          >
            ADD TO CART
          </button>
          <div>{ReactHtmlParser(description)}</div>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = {
  addProductToCart,
};

export default connect(null, mapDispatchToProps)(Productdetails);
