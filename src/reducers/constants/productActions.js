// action constants
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const GET_PRODUCT = 'GET_PRODUCT';

// action creators
export const _getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

export const _getProduct = product => {
  return {
    type: GET_PRODUCT,
    product
  }
}

export const _addProduct = product => {
  return {
    type: ADD_PRODUCT,
    product
  }
}

export const _updateProduct = product => {
  return {
    type: UPDATE_PRODUCT,
    product
  }
}

export const _deleteProduct = product => {
  return {
    type: DELETE_PRODUCT,
    product
  }
}