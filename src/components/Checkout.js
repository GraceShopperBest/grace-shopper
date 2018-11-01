import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Typography, Grid, IconButton, Button, Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core'
import { placeOrder } from '../store'

class Cart extends Component {

    constructor() {
        super()
        this.handlePlaceOrder = this.handlePlaceOrder.bind(this)
    }

    handlePlaceOrder() {
        const { id } = this.props.location.state.cart
        const { userId } = this.props
        this.props.placeOrder({ id, type: 'ORDER' }, userId)
    }

    render() {
        const { userId } = this.props
        const { handlePlaceOrder } = this
        const { cart, totalAmount } = this.props.location.state

        return (
            <Fragment>
                <Button onClick={handlePlaceOrder} variant="outlined" color="primary"> Place Order </Button>
            </Fragment>
        )

        
    }

}

const mapStateToProps = ({ authenticatedUser }) => {
    return {
        userId: authenticatedUser.id
    }
}

const mapDispatchToProps = (dispatch, {history}) => {
    return {
        placeOrder: (order, userId) => dispatch(placeOrder(order, userId, history)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)