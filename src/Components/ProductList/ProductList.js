import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import ProductItem from '../ProductItem/ProductItem';
import { queryGenerator } from '../../queries/queries';

export class ProductList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { symbol, category } = this.props;
    return (
      <Query query={queryGenerator(category)}>
        {({ data, loading }) => {
          if (loading) return <h1>loading...</h1>;
          const { name, products } = data.category;
          return (
            <section>
              <h1>{name}</h1>
              {products.map((product) => (
                <ProductItem
                  key={product.id}
                  symbol={symbol}
                  product={product}
                />
              ))}
            </section>
          );
        }}
      </Query>
    );
  }
}
export default ProductList;
