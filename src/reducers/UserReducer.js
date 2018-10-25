import {
    GET_USERS,
    DELETE_USER,
    UPDATE_USER,
    ADD_USER,
    _deleteUser,
    _updateUser,
    _addUser,
    _getUsers } from './UserActions';
import axios from 'axios';

const updateUser = (user) => {
    return (dispatch) => {
        return axios.put(`/api/users/${user.id}`, user)
            .then(res => res.data)
            .then(user => dispatch(_updateUser(user)))
    };
};

const addUser = (user) => {
    return (dispatch) => {
        return axios.post(`/api/users`, user)
            .then(res => res.data)
            .then(user => dispatch(_addUser(user)))
    };
};

const deleteUser = (user, history) => {
    return (dispatch) => {
        dispatch(_deleteUser(user));
        return axios.delete(`/api/user/${user.id}`)
            .then(()=> history.goBack());
    };
};

const getUsers = () => {
    return (dispatch) => {
        return axios.get('/api/users')
            .then(res => res.data)
            .then(users => dispatch(_getUsers(users)))
    };
};

const getUserById = (users, id) => users.find(user => user.id === id);

const UserReducer = (state = [], action) => {
    switch(action.type){
        case GET_USERS:
            return action.users;
        case DELETE_USER:
            return state.filter(user => user.id != action.user.id);
        case UPDATE_USER:
            return state.map(user => {
                return user.id === action.user.id ? action.user : user;
            })
        case ADD_USER:
            return [ ...state, action.user];     
        default: return state
    };
};

export default UserReducer;
export { 
    getUsers,
    updateUser,
    addUser,
    deleteUser,
    getUserById
}