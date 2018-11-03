import React, { Component, Fragment } from 'react'
import { IconButton, Typography, Button, Grid } from '@material-ui/core'
import { AddCircle, RemoveCircle } from '@material-ui/icons'

class ItemQuantity extends Component {

    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this)
        this.handleAddToCart = this.handleAddToCart.bind(this)
        this.state = {
            quantity: 0
        }
    }

    componentDidMount() {
        if(this.props.quantity) {
            this.setState({
                quantity: this.props.quantity
            })
        }
    }

    handleChange(quantity) {
        const { updateQuantity, cartId, itemId, price, addToCart, productId } = this.props
        if(quantity && updateQuantity) {
            updateQuantity(quantity, cartId, price, itemId, productId)
            this.setState({ quantity })
        }
        else if(quantity >= 0 && addToCart) {
            this.setState({ quantity })
        }
    }

    handleAddToCart() {
        const { quantity } = this.state
        const { addToCart, productId, price } = this.props
        addToCart(productId, quantity, price)
        this.setState({ quantity: 0 })
    }


    render() {
        const { quantity } = this.state
        const { handleChange, handleAddToCart } = this
        const { addToCart } = this.props

        return (
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item>
                    <IconButton onClick={() => handleChange(quantity - 1)} variant="outlined">
                        <RemoveCircle />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Typography variant="subheading">{quantity}</Typography>
                </Grid>
                <Grid item>
                    <IconButton onClick={() => handleChange(quantity + 1)} variant="outlined">
                        <AddCircle />
                    </IconButton>
                </Grid>
                {
                    !addToCart ? null
                        : <Grid item xs={2}>
                            <Button onClick={() => handleAddToCart()} variant="outlined" color="primary" disabled={!quantity}>
                                Add To Cart
                            </Button>
                          </Grid>
                }
            </Grid>
        )
    }
}

export default ItemQuantity
