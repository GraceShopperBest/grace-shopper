import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { UserReducer, getUsers } from './reducers/UserReducer';
import { productReducer, getProducts, getCategories, getProductByCategory } from './reducers/products';
import {
  login,
  logout,
  authenticatedUserReducer,
  exchangeTokenForAuth,
} from './reducers/authenticatedUser';

const reducer = combineReducers({
  users: UserReducer,
  products: productReducer,
  authenticatedUser: authenticatedUserReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
export { login, logout, exchangeTokenForAuth, getUsers, getProducts, getCategories, getProductByCategory };
