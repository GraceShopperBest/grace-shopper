import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { UserReducer, getUsers } from './reducers/UserReducer';
import { productReducer, getProducts, getProduct, getCategories, getProductByCategory } from './reducers/products';
import { ordersReducer, getOrders, createCart, getCart, placeOrder, 
  createLineItemInCart, deleteLineItemFromCart, updateLineItemInCart, resetOrders } from './reducers/orders'

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
  orders: ordersReducer
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

const getCartWithItems = (orders, products) => {
  const emptyCart = { line_items: [] }

  if(!orders || !products) return emptyCart

  const cart = getCart(orders)
  if(!cart) return emptyCart

  return (!cart.line_items) ? {...cart, line_items: []}
      : {...cart, line_items: cart.line_items.map(item => ({...item, product: getProduct(item.productId, products) }))}       
}

export default store;

export { login, logout, exchangeTokenForAuth, getUsers, getProducts, getOrders, getCartWithItems, createCart, resetOrders,
  placeOrder, createLineItemInCart, deleteLineItemFromCart, updateLineItemInCart, getCategories, getProductByCategory   };

