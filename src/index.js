import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store/store';
import App from './App';
import './index.css';

const cache = new InMemoryCache({
  typePolicies: {
    AttributeSet: {
      keyFields: false,
    },
    Attribute: {
      keyFields: false,
    },
  },
});
const client = new ApolloClient({
  uri: 'https://minimal-react-store.herokuapp.com/',
  cache,
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Router>
          <App />
        </Router>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
);

export default cache;
