export const GET_ORDERS = 'GET_ORDERS'
export const RESET_ORDERS = 'RESET_ORDERS'
export const CREATE_ORDER = 'CREATE_ORDER'
export const UPDATE_ORDER = 'UPDATE_ORDER'
export const CREATE_LINEITEM = 'CREATE_LINEITEM'
export const DELETE_LINEITEM = 'DELETE_LINEITEM'
export const UPDATE_LINEITEM = 'UPDATE_LINEITEM'

export const _getOrders = (orders) => ({ type: GET_ORDERS, orders })
export const _resetOrders = () => ({ type: RESET_ORDERS })
export const _createOrder = (order) => ({ type: CREATE_ORDER, order })
export const _updateOrder = (order) => ({ type: UPDATE_ORDER, order })
export const _createLineItem = (cartId, lineItem) => ({ type: CREATE_LINEITEM, cartId, lineItem })
export const _deleteLineItem = (cartId, itemId) => ({ type: DELETE_LINEITEM, cartId, itemId })
export const _updateLineItem = (cartId, lineItem) => ({ type: UPDATE_LINEITEM, cartId, lineItem })