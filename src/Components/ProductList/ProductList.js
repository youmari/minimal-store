import React from 'react';
import { Query } from '@apollo/client/react/components';
import ProductItem from '../ProductItem/ProductItem';
import { queryGenerator } from '../../queries/queries';
import './ProductList.style.css';
import Loading from '../Loading/Loading';

const ProductList = ({ symbol, category }) => (
  <Query query={queryGenerator(category)}>
    {({ data, loading }) => {
      if (loading) return <Loading />;
      const { name, products } = data.category;
      return (
        <section>
          <h1 className="category-title">{name}</h1>
          <div className="products-container">
            {products.map((product) => (
              <ProductItem key={product.id} symbol={symbol} product={product} />
            ))}
          </div>
        </section>
      );
    }}
  </Query>
);

export default ProductList;
