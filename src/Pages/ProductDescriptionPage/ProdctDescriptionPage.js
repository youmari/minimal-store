import { Query } from '@apollo/client/react/components';
import React, { Component } from 'react';
import Productdetails from '../../Components/ProductDetails/ProductDetails';
import { getProduct } from '../../queries/queries';

class ProdctDescriptionPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { productId, symbol } = this.props;
    return (
      <Query query={getProduct(productId)}>
        {({ data, loading }) => {
          if (loading) return <h1>Loading....</h1>;
          const { product } = data;
          return <Productdetails symbol={symbol} product={product} />;
        }}
      </Query>
    );
  }
}

export default ProdctDescriptionPage;
