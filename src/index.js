import React from 'react';
import { createRoot } from 'react-dom/client';
import store from './Redux/store/store';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
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
