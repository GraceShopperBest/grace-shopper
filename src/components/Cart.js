import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Typography, Grid, IconButton, Button } from '@material-ui/core'
import { Clear } from '@material-ui/icons'
import ItemQuantity from './ItemQuantity'
import { getCartWithItems, placeOrder, deleteLineItemFromCart, updateLineItemInCart } from '../store'

class Cart extends Component {

    constructor() {
        super()
        this.updateQuantity = this.updateQuantity.bind(this)
        this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this)
        this.handlePlaceOrder = this.handlePlaceOrder.bind(this)
    }

   updateQuantity(quantity, cartId, price, itemId) {
        const { userId } = this.props
        this.props.updateLineItemInCart(cartId, quantity, itemId, price, userId)
    }


    handleRemoveFromCart(cartId, itemId) {
        const { userId } = this.props
        this.props.deleteLineItemFromCart(cartId, itemId, userId)
    }

    handlePlaceOrder() {
        const { id } = this.props.cart
        const { userId } = this.props
        this.props.placeOrder({ id, type: 'ORDER' }, userId)
    }

    render() {
        const { cart } = this.props
        const { handlePlaceOrder, handleRemoveFromCart, updateQuantity } = this
        const totalAmount = calculateTotalAmount(cart)

        return (
            <Fragment>
                <Typography variant="title" style={{marginTop: "10vh", marginBottom: "5vh", fontWeight: "bold"}}>
                {
                    !cart.line_items.length ? "Cart is empty" : "Shopping Cart"
                }
                </Typography>
                {
                    !cart.line_items.length
                        ? ""
                        : <Fragment>
                            <Grid container justify="center" >
                            {
                                cart.line_items.map(item => 
                                    <Grid container key={item.id} style={{marginTop: "5vh"}}>
                                        <Grid container justify="center" style={{display:"flex"}} spacing={0}>
                                            <Grid item xs>
                                                <Typography variant="subheading">{item.product.title}</Typography>
                                            </Grid>
                                            <Grid item xs>
                                                <img src={item.product.imageUrl} style={{height: "20vh" }}/>
                                            </Grid>
                                            <Grid item xs>
                                                <ItemQuantity updateQuantity={updateQuantity} cartId={cart.id} itemId={item.id} 
                                                    quantity={item.quantity} price={item.product.price}/>
                                            </Grid>
                                            <Grid item xs>
                                                <Typography variant="subheading">{`$ ${item.product.price}`}</Typography>
                                            </Grid>
                                            <Grid item xs>
                                                <Typography variant="subheading">{`$ ${item.product.price * item.quantity}`}</Typography>
                                            </Grid>
                                            <Grid item xs>
                                                <IconButton onClick={() => handleRemoveFromCart(cart.id, item.id)} variant="outlined" color="secondary">
                                                    <Clear />
                                                </IconButton> 
                                            </Grid>
                                        </Grid>          
                                </Grid>
                                )
                            }
                            </Grid>
                            <Grid container style={{marginTop: "10vh"}}>
                                <Grid item xs>
                                    <Typography variant="subheading" style={{fontWeight: "bold"}}>
                                        {`Total Amount: $ ${totalAmount}`}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container style={{marginTop: "1vh"}}>
                                <Grid item xs>
                                    <Button onClick={handlePlaceOrder} variant="contained" color="default"> Place Order </Button>
                                </Grid>
                           </Grid>
                            </Fragment>
                }
            </Fragment>
        )
    }

}

const calculateTotalAmount = (cart) => {
    let result = 0
    cart.line_items.forEach(item => {
        result += item.quantity * parseFloat(item.product.price).toFixed(2)
    })
    return result
}

const mapStateToProps = ({ orders, products, authenticatedUser }) => {
    return {
        cart: getCartWithItems(orders, products),
        userId: authenticatedUser.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        placeOrder: (order, userId) => dispatch(placeOrder(order, userId)),
        deleteLineItemFromCart: (cartId, itemId, userId) => dispatch(deleteLineItemFromCart(cartId, itemId, userId)),
        updateLineItemInCart: (cartId, quantity, itemId, price, userId) => 
            dispatch(updateLineItemInCart(cartId, { quantity, price }, itemId, userId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)