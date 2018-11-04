import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { reviewsReducer, getReviews, createReview } from './reducers/reviews';
import { productCountReducer, getProductCount, getProductCountByCategory } from './reducers/productCount'
import { userCountReducer, getUserCount } from './reducers/userCount';
import { getProduct } from './utils';
import {
  userReducer,
  getUsers,
  addUser,
  deleteUser,
  updateUser,
} from './reducers/user';
import {
  productReducer,
  getProducts,
  getPagedProducts
} from './reducers/products';
import {
  ordersReducer,
  getOrders,
  createCart,
  getCart,
  placeOrder,
  createLineItemInCartForLoggedUser,
  deleteLineItemFromCartForLoggedUser,
  updateLineItemInCartForLoggedUser,
  resetOrders,
  addMultipleLineItems,
  createCartWithMultipleLineItems,
} from './reducers/orders';

import {
  login,
  logout,
  authenticatedUserReducer,
  exchangeTokenForAuth,
} from './reducers/authenticatedUser';

import {
  localCartReducer,
  createLineItemInLocalCart,
  deleteLineItemFromLocalCart,
  updateLineItemInLocalCart,
  resetLocalCart,
} from './reducers/localCart';

const reducer = combineReducers({
  users: userReducer,
  products: productReducer,
  authenticatedUser: authenticatedUserReducer,
  orders: ordersReducer,
  reviews: reviewsReducer,
  localCart: localCartReducer,
  productCount: productCountReducer,
  userCount: userCountReducer
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

const createLineItemInCart = (cartId, item, userId) => {
  return dispatch => {
    if (userId) {
      dispatch(createLineItemInCartForLoggedUser(cartId, item, userId));
    } else {
      dispatch(createLineItemInLocalCart(item));
    }
  };
};

const deleteLineItemFromCart = (cartId, itemId, userId, productId) => {
  return dispatch => {
    if (userId) {
      dispatch(deleteLineItemFromCartForLoggedUser(cartId, itemId, userId));
    } else {
      dispatch(deleteLineItemFromLocalCart(productId));
    }
  };
};

const updateLineItemInCart = (cartId, item, itemId, userId) => {
  return dispatch => {
    if (userId) {
      dispatch(updateLineItemInCartForLoggedUser(cartId, item, itemId, userId));
    } else {
      dispatch(updateLineItemInLocalCart(item));
    }
  };
};

const getCartWithItems = (orders, products, localCart) => {
  const emptyCart = { line_items: [] };
  const cart = !orders ? [] : getCart(orders);

  if ((!cart && !localCart.length) || !products) return emptyCart;

  if (localCart.length) {
    return {
      line_items: localCart.map(item => ({
        ...item,
        product: getProduct(item.productId, products),
      })),
    };
  }

  return !cart.line_items
    ? { ...cart, line_items: [] }
    : {
        ...cart,
        line_items: cart.line_items.map(item => ({
          ...item,
          product: getProduct(item.productId, products),
        })),
      };
};

const mergeCartWithLocalCartOnLogin = (orders, localCart, userId) => {
  return dispatch => {
    if (!orders || !localCart || !userId || !localCart.length) return;
    const cart = getCart(orders);

    let mergedItems = {
      cartId: cart && cart.id ? cart.id : undefined,
      changedItems: [],
      addedItems: [],
    };

    if (!cart || !cart.line_items) {
      mergedItems = { ...mergedItems, addedItems: localCart };
    } else {
      mergedItems = localCart.reduce((result, input) => {
        const itemInDB = cart.line_items.find(
          element => element.productId === input.productId
        );
        if (itemInDB) {
          result.changedItems.push({
            id: itemInDB.id,
            quantity: input.quantity + itemInDB.quantity,
            price: input.price,
            productId: input.productId,
          });
        } else {
          result.addedItems.push({
            quantity: input.quantity,
            price: input.price,
            productId: input.productId,
          });
        }
        return result;
      }, mergedItems);
    }

    if (mergedItems.cartId) {
      dispatch(addMultipleLineItems(mergedItems, userId, dispatch)).then(() =>
        dispatch(resetLocalCart())
      );
    } else {
      dispatch(createCartWithMultipleLineItems(mergedItems, userId)).then(() =>
        dispatch(resetLocalCart())
      );
    }
  };
};

export default store;

export {
  login,
  logout,
  exchangeTokenForAuth,
  getUsers,
  getProducts,
  getOrders,
  getCartWithItems,
  createCart,
  resetOrders,
  placeOrder,
  createLineItemInCart,
  deleteLineItemFromCart,
  updateLineItemInCart,
  getReviews,
  createReview,
  addUser,
  mergeCartWithLocalCartOnLogin,
  getProductCount,
  getUserCount,
  getPagedProducts,
  getProductCountByCategory,
  deleteUser,
  updateUser
};
