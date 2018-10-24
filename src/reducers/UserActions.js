export const GET_USERS = 'GET_USERS';
export const DELETE_USER = 'DELETE_USER';
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';

export const _addUser = (user) => {
    return {
        type: ADD_USER,
        user
    }
};

export const _updateUser = (user) => {
    return {
        type: UPDATE_USER,
        user
    }
};

export const _getUsers = (users) => {
    return {
        type: GET_USERS,
        users
    }
};

export const _deleteUser = (user) => {
    return {
        type: DELETE_USER,
        user
    }
};