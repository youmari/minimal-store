import React, { Component } from 'react';
import checked from '../../Assets/checked.png';
import './ProductAttribute.style.css';

class Productattribute extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { attribute, handleAttributeOnChange } = this.props;
    return (
      <div>
        <h4>{attribute.name}:</h4>
        <ul>
          <li className="items-container">
            {attribute?.items.map((item) =>
              attribute.name === 'Color' ? (
                <label
                  key={item.id}
                  style={{ backgroundColor: `${item.value}` }}
                  className="color-radio-btns"
                >
                  <input
                    className="color-radio-btn"
                    type="radio"
                    id={item.id}
                    name={attribute.name}
                    value={item.id}
                    onChange={(event) => {
                      handleAttributeOnChange(event);
                    }}
                  />
                  <img src={checked} alt="checkmark" className="checkmark" />
                  <span />
                </label>
              ) : (
                <label key={item.id} className="other-radio-btns">
                  <input
                    className="other-radio-btn"
                    type="radio"
                    id={item.id}
                    name={attribute.name}
                    value={item.value}
                    onChange={(event) => {
                      handleAttributeOnChange(event);
                    }}
                  />
                  <span className="other-checkmark">{item.value}</span>
                </label>
              ),
            )}
          </li>
        </ul>
      </div>
    );
  }
}

export default Productattribute;
