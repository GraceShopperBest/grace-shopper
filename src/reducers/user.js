import axios from 'axios';
import {
  GET_USERS,
  DELETE_USER,
  UPDATE_USER,
  ADD_USER,
  _deleteUser,
  _updateUser,
  _addUser,
  _getUsers,
} from './constants/userActions';

const updateUser = user => {
  return dispatch => {
    return axios
      .put(`/api/users/${user.id}`, user)
      .then(response => response.data)
      .then(updated => dispatch(_updateUser(updated)));
  };
};

const addUser = user => {
  return dispatch => {
    return axios
      .post('/api/users', user)
      .then(response => response.data)
      .then(newUser => dispatch(_addUser(newUser)));
  };
};

const deleteUser = user => {
  return dispatch => {
    return axios
      .delete(`/api/users/${user.id}`)
      .then(response => response.data)
      .then(() => dispatch(_deleteUser(user)));
  };
};

const getUsers = () => {
  return dispatch => {
    return axios
      .get('/api/users')
      .then(res => res.data)
      .then(users => dispatch(_getUsers(users)));
  };
};

const getUserById = (users, id) => users.find(user => user.id === id);

const userReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    case DELETE_USER:
      return state.filter(user => user.id !== action.user.id);
    case UPDATE_USER:
      return state.map(user => {
        return user.id === action.user.id ? action.user : user;
      });
    case ADD_USER:
      return [...state, action.user];
    default:
      return state;
  }
};

export { getUsers, updateUser, addUser, deleteUser, getUserById, userReducer };
