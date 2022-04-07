import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import { queryGenerator } from './queries';

export class ProductList extends Component {
  constructor(props) {
    super(props);
  }

  data = ({ data, loading, error }) => {
    const { symbol } = this.props;
    if (loading) return <h1>Loading....</h1>;
    const { name, products } = data.category;
    return (
      <section>
        <h1>{name}</h1>
        {products.map((product) => (
          <article key={product.id}>
            <img
              style={{ width: 200 }}
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
        ))}
      </section>
    );
  };

  render() {
    return <Query query={queryGenerator('all')}>{this.data}</Query>;
  }
}
export default ProductList;
