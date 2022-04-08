import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import cartReducer from '../Cart/Cart';

const reducers = combineReducers({
  cart: cartReducer,
});

const store = createStore(reducers, applyMiddleware(logger));

export default store;
