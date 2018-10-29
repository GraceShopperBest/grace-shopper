import React, { Component, Fragment } from 'react'
import { IconButton, Typography, Button } from '@material-ui/core'
import { AddCircle, RemoveCircle } from '@material-ui/icons'

class ProductQty extends Component {

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
        const { updateQuantity, cartId, itemId, addToCart } = this.props
        if(quantity && updateQuantity) {
            updateQuantity(quantity, cartId, itemId)
            this.setState({ quantity })
        }
        else if(quantity >= 0 && addToCart) {
            this.setState({ quantity })
        }
    }

    handleAddToCart() {
        const { quantity } = this.state
        const { addToCart, productId } = this.props
        addToCart(productId, quantity)
        this.setState({ quantity: 0 })
    }


    render() {
        const { quantity } = this.state
        const { handleChange, handleAddToCart } = this
        const { addToCart } = this.props

        return (
            <Fragment>
                <IconButton onClick={() => handleChange(quantity - 1)} variant="outlined" color="inherit">
                    <RemoveCircle />
                </IconButton>
                <Typography variant="subheading">{quantity}</Typography>
                <IconButton onClick={() => handleChange(quantity + 1)} variant="outlined" color="inherit">
                    <AddCircle />
                </IconButton>
                {
                    !addToCart ? null
                        : <Button onClick={() => handleAddToCart()} variant="outlined" color="primary" disabled={!quantity}>
                            Add To Cart
                        </Button>
                }
            </Fragment>
        )
    }
}

export default ProductQty