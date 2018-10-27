import {createStore, applyMiddleware, combineReducers} from 'redux';
import loggerMiddleware from 'redux-logger';
import thunk from 'redux-thunk';
import {UserReducer, getUsers} from './reducers/UserReducer';
import { login, logout, authenticatedUserReducer, exchangeTokenForAuth } from './reducers/authenticatedUser'

const reducer = combineReducers({
    users: UserReducer,
    authenticatedUser: authenticatedUserReducer,
});

const store = createStore(reducer, applyMiddleware(loggerMiddleware, thunk));

export default store;

export { login, logout, exchangeTokenForAuth, getUsers };