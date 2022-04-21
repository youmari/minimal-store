import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import cartReducer from '../Cart/cart';

const reducers = combineReducers({
  cartReducer,
});

const store = createStore(reducers, applyMiddleware(logger));
export default store;
