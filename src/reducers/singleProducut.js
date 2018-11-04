import axios from 'axios';
import {
  GET_PRODUCT,  
  _getProduct
} from './constants/productActions';

const getProduct = (id) => {
    return (dispatch) => {
      return axios.get(`/api/products/${id}`)
        .then(res => res.data)
        .then(product => dispatch(_getProduct(product)))
        .catch(error => console.log(error))
    };
  };


// reducer
const singleProductReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_PRODUCT:
            state = action.product
        }
    return state;
}

export {
    singleProductReducer,
    getProduct
}
