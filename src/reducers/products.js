import axios from 'axios';
import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  _getProducts,
  _addProduct,
  _updateProduct,
  _deleteProduct
} from './constants/productActions';


// thunks
const getPagedProducts = (index, category) => {
  return (dispatch) => {
    if(category==='All'){
      return axios.get(`/api/products/page/${index}`)
      .then(res => res.data)
      .then(products => dispatch(_getProducts(products)))
      .catch(error => console.log(error))
    } else {
      return axios.get(`/api/products/categories/${category}/page/${index}`)
      .then(res => res.data)
      .then(products => dispatch(_getProducts(products)))
      .catch(error => console.log(error))
    }

  };
};

const getProducts = () => {
  return (dispatch) => {
    return axios.get(`/api/products`)
      .then(res => res.data)
      .then(products => dispatch(_getProducts(products)))
      .catch(error => console.log(error))
  };
}

const addProduct = (product) => {
  return (dispatch) => {
    return axios.post(`/api/products`, product)
      .then(res => res.data)
      .then(product => dispatch(_addProduct(product)))
      // .catch(error => console.log(error))
  };
};

const updateProduct = (product) => {
  return (dispatch) => {
    return axios.put(`/api/products/${product.id}`, product)
      .then(res => res.data)
      .then(product => dispatch(_updateProduct(product)))
  };
};

const deleteProduct = (product, history) => {
  return (dispatch) => {
      return axios.delete(`/api/products/${product.id}`)
        .then(() => dispatch(_deleteProduct(product)))
        .then(() => history.back())
  }
};


// reducer
const productReducer = (state = [], action) => {

  switch(action.type) {

    case GET_PRODUCTS:
      state = action.products
      break;

    case ADD_PRODUCT:
      state = [...state, action.product]
      break;

    case UPDATE_PRODUCT:
      state = [...state.filter(product => product.id !== action.product.id), action.product]
      break;

    case DELETE_PRODUCT:
      state = state.filter(product => product.id !== action.product.id)
      break;
  }

  return state;
}



export {
  productReducer,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getPagedProducts
}
