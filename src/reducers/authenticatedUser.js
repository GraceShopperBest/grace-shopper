const axios = require('axios')

const SET_AUTHENTICATED_USER = 'SET_AUTHENTICATED_USER'
const _setAuthenticatedUser = (authenticatedUser) => ({ type: SET_AUTHENTICATED_USER, authenticatedUser})

const login = (credentials) => {

    console.log(credentials)
    return (dispatch) => {
        return axios.post('/api/auth', credentials)
            .then(response => response.data)
            .then( data => {
                window.localStorage.setItem('token', data.token);
                dispatch(exchangeTokenForAuth());
            })
            .catch(error => {
                throw error
            })
        }
}

const exchangeTokenForAuth = () => {
    return (dispatch) => {
        const token = window.localStorage.getItem('token');
        if(!token) {
            return 
        }
        return axios.get('/api/auth', {
            headers: {
                authorization: token
            }})
            .then(response => response.data)
            .then(auth => {
                dispatch(_setAuthenticatedUser(auth))
            }) 
            .catch(ex => window.localStorage.removeItem('token'))
    }
}
  
const logout = () => {
    return (dispatch) => {
        window.localStorage.removeItem('token');
        dispatch(_setAuthenticatedUser({}))
    }
}
  
const authenticatedUserReducer = (state = {}, action) => {
    switch(action.type) {
        case SET_AUTHENTICATED_USER:
            return action.authenticatedUser
        default:
            return state
    }
}

export { login, logout, exchangeTokenForAuth, authenticatedUserReducer }