import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { addProductToCart } from '../../Redux/Cart/cart';
import ProductAttribute from '../ProductAttribute/ProductAttribute';
import './AttributesPopUp.style.css';

class AttributesPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attributes: [],
      checker: new Set(),
      isThereAttributes: false,
    };
  }

  handleAttributeOnChange = (event) => {
    const { checker, attributes } = this.state;
    const { name, value } = event.target;
    if (!checker.has(name)) {
      this.setState((state) => state.checker.add(name));
      this.setState({
        attributes: [...attributes, { name, value }],
      });
    } else {
      this.setState((state) => state.attributes.forEach((attribute) => {
        if (attribute.name === name) {
          attribute.value = value;
        }
      }));
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
    const { attributes } = this.state;
    const {
      product,
      product: { inStock, id },
      addProductToCart,
      setIsOpen,
    } = this.props;
    const numberOfAttributes = product.attributes.length;
    if (numberOfAttributes !== attributes.length) {
      this.setState({ isThereAttributes: true });
    } else {
      if (!inStock) return;
      this.setState({ isThereAttributes: false });
      addProductToCart(id, attributes);
      this.setState({ attributes: [], checker: new Set() });
      setIsOpen();
    }
  };

  render() {
    const { isThereAttributes } = this.state;
    const { attributes, setIsOpen, product: { name } } = this.props;
    return ReactDOM.createPortal(
      <>
        <article className="pop-up-attributes">
          {isThereAttributes && (
            <ul>
              {this.attributesNeeded().map((item) => (
                <li key={item.id}>
                  <strong style={{ color: 'red' }}>
                    {item.name}
                    {' '}
                    is not selected, Please try to choose one
                  </strong>
                </li>
              ))}
            </ul>
          )}
          <h2>{name}</h2>
          {attributes?.map((attribute) => (
            <ProductAttribute
              key={attribute.id}
              attribute={attribute}
              handleAttributeOnChange={this.handleAttributeOnChange}
            />
          ))}
          <button
            className="add-to-cart-btn"
            type="button"
            onClick={this.handleAddToCArtOnClick}
          >
            ADD TO CART
          </button>
        </article>
        <div aria-hidden="true" className="overlay pop-up-overlay" onClick={setIsOpen} />
      </>,
      document.getElementById('portal'),
    );
  }
}

const mapDispatchToProps = {
  addProductToCart,
};

export default connect(null, mapDispatchToProps)(AttributesPopUp);
