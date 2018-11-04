import axios from 'axios';

const GET_USER_COUNT = 'GET_USER_COUNT';

const _getUserCount = count => {
  return {
    type: GET_USER_COUNT,
    count
  }
}


const getUserCount = () => {
  return (dispatch) => {
    return axios.get('/api/users/count')
      .then(res => res.data)
      .then(count => dispatch(_getUserCount(count)))
      .catch(error => console.log(error))
  };
};


const userCountReducer = (state = 0, action) => {
    switch (action.type) {
        case GET_USER_COUNT:
          return action.count;
        default:
          return state;
      }
}

export {
    userCountReducer,
    getUserCount
}