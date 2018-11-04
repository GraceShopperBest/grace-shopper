import axios from 'axios'
import {
    GET_ORDERS,
    RESET_ORDERS,
    CREATE_ORDER,
    UPDATE_ORDER,
    CREATE_LINEITEM,
    DELETE_LINEITEM,
    UPDATE_LINEITEM,
    _getOrders,
    _resetOrders,
    _createOrder,
    _updateOrder,
    _createLineItem,
    _deleteLineItem,
    _updateLineItem
} from './constants/orderActions';


const getOrders = (userId) => {
    return (dispatch) => {
        return axios.get(`/api/users/${userId}/orders`)
            .then(response => response.data)
            .then(orders => dispatch(_getOrders(orders)))
    }
}

const resetOrders = () => {
    return (dispatch) => {
        dispatch(_resetOrders())
    }
}

//Create Cart when the first item is added
const createCart = (item, userId) => {
    return (dispatch) => {
        return axios.post(`/api/users/${userId}/orders`, item)
            .then(response => response.data)
            .then(order => dispatch(_createOrder(order))) 
    }
}

const addMultipleLineItems = (items, userId) => {
    return (dispatch) => {
        return axios.post(`/api/users/${userId}/orders/${items.cartId}`, items)
            .then(response => response.data)
            .then(order => dispatch(_updateOrder(order))) 
    }
}

const createCartWithMultipleLineItems = (items, userId) => {
    return (dispatch) => {
        return axios.post(`/api/users/${userId}/orders/`, items.addedItems[0])
            .then(response => response.data)
            .then((order) => {
                const rest = items.addedItems.slice(1)
                if(rest.length) {
                    return axios.post(`/api/users/${userId}/orders/${order.id}`, {addedItems: rest, changedItems: []})
                        .then(response => response.data)
                }
                return order
            }).then(order => dispatch(_createOrder(order))) 
    }
}

const placeOrder = (order, userId, history) => {
    return (dispatch) => {
        axios.put(`/api/users/${userId}/orders/${order.id}`, order)
            .then(response => response.data)
            .then(order => dispatch(_updateOrder(order)))
            .then(() => history.push('/orderConfirmation'))
    }
}

const createLineItemInCartForLoggedUser = (cartId, item, userId) => {
    return (dispatch) => {
        return axios.post(`/api/users/${userId}/orders/${cartId}/lineItems`, item)
                .then(response => response.data)
                .then(lineItem => dispatch(_createLineItem(cartId, lineItem)))
    }
}

const deleteLineItemFromCartForLoggedUser = (cartId, itemId, userId) => {
    return (dispatch) => {
        return axios.delete(`/api/users/${userId}/orders/${cartId}/lineItems/${itemId}`)
                .then(() => dispatch(_deleteLineItem(cartId, itemId)))
    }
}

const updateLineItemInCartForLoggedUser = (cartId, item, itemId, userId) => {
    return (dispatch) => {
        return axios.put(`/api/users/${userId}/orders/${cartId}/lineItems/${itemId}`, item)
                .then(response => response.data)
                .then(lineItem => dispatch(_updateLineItem(cartId, lineItem)))
    }
}

const ordersReducer = (state = [], action) => {
    let order, updatedOrder
    switch(action.type) {
        case GET_ORDERS:
            return action.orders
        case RESET_ORDERS:
            return []
        case CREATE_ORDER:
            return [...state, action.order]
        case UPDATE_ORDER:
            return state.map(order => order.id !== action.order.id ? order : action.order)
        case CREATE_LINEITEM:
            order = state.find(order => order.id === action.cartId)
            updatedOrder = { ...order, line_items: [...order.line_items, action.lineItem] }
            return state.map( order => order.id !== action.cartId ? order : updatedOrder )
        case DELETE_LINEITEM:
            order = state.find(order => order.id === action.cartId)
            updatedOrder = { ...order, line_items: order.line_items.filter(i => i.id !== action.itemId) }
            return state.map( order => order.id !== action.cartId ? order : updatedOrder )
        case UPDATE_LINEITEM:
            order = state.find(order => order.id === action.cartId)
            updatedOrder = { ...order, line_items: order.line_items.map(i => i.id !== action.lineItem.id ? i : action.lineItem) }
            return state.map( order => order.id !== action.cartId ? order : updatedOrder )
        default:
            return state
    }
}

const getCart = (orders) => {
    return orders.find(order => order.type === 'CART' )
}

export { ordersReducer, getOrders, createCart, getCart, placeOrder, createLineItemInCartForLoggedUser,
    deleteLineItemFromCartForLoggedUser, updateLineItemInCartForLoggedUser, resetOrders, 
    addMultipleLineItems, createCartWithMultipleLineItems }