import axios from 'axios';

const GET_PRODUCT_COUNT = 'GET_PRODUCT_COUNT';

const _getProductCount = count => {
  return {
    type: GET_PRODUCT_COUNT,
    count
  }
}


const getProductCount = () => {
  return (dispatch) => {
    return axios.get('/api/products/total/count')
      .then(res => res.data)
      .then(count => dispatch(_getProductCount(count)))
      .catch(error => console.log(error))
  };
};

const getProductCountByCategory = (category) => {
  return (dispatch) => {
    return axios.get(`/api/products/categories/${category}/count`)
      .then(res => res.data)
      .then(count => dispatch(_getProductCount(count)))
      .catch(error => console.log(error))
  };
};


const productCountReducer = (state = 0, action) => {
    switch (action.type) {
        case GET_PRODUCT_COUNT:
          return action.count;
        default:
          return state;
      }
}

export {
    productCountReducer,
    getProductCount,
    getProductCountByCategory
}