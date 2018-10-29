import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Card, CardHeader, CardContent, CardActions, Typography, Divider } from '@material-ui/core';
import { connect } from 'react-redux';
import { getProductById } from './../utils';
import { createCart, getCartWithItems, createLineItemInCart, updateLineItemInCart } from '../store'
import ProductImageCarousel from './ProductImageCarousel';
import ItemQuantity from './ItemQuantity'

class ProductDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: this.props.product
        };
        this.handleAddToCart = this.handleAddToCart.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event, productId) {
        this.productQty[productId] = event.target.value
    }

    handleAddToCart(productId, quantity, price) {
        const item = { productId, quantity, price }
        const { cart, createCart, createLineItemInCart, updateLineItemInCart, userId } = this.props
        if(!cart.id) {
            createCart(item, userId)
        }
        else {
            const lineItem = cart.line_items.find(i => i.productId === item.productId )
            console.log(lineItem)
            if(!lineItem) {                 
                createLineItemInCart(cart.id, item, userId)
            }
            else {                  
                updateLineItemInCart(cart.id, (item.quantity + lineItem.quantity), lineItem.id, price, userId)
            }
        }
    }

    render() {
        const { classes } = this.props;
        const { product } = this.state;
        const { handleAddToCart } = this;
        const images = product.images;
        images.unshift(product.primaryImageUrl)
        return (
            <Fragment>
                <div className={classes.container}>
                    <div style={{ gridColumnEnd: 'span 6' }}>
                        <ProductImageCarousel images={images}/>
                    </div>
                    <div style={{ gridColumnEnd: 'span 6' }}>
                    <Card className={classes.card}>
                        <CardHeader
                        title={product.title}
                        subheader="author TODO"
                        />
                        <CardContent>
                            <Typography component="p" variant="subheading" gutterBottom={true}>
                                Price: {product.price}
                            </Typography>
                            <Divider />
                            <Typography paragraph variant="subheading" gutterBottom={true}>Product Details:</Typography>
                            <Typography paragraph >
                                {product.description}
                            </Typography>
                        </CardContent>
                        <CardActions className={classes.actions} disableActionSpacing>
                            <ItemQuantity addToCart={handleAddToCart} productId={product.id} price={product.price} />
                        </CardActions>
                    </Card>
                    </div>
                </div>
                <div className={classes.container}>
                    <div style={{ gridColumnEnd: 'span 12' }}>
                        <Card className={classes.card}>
                            <CardHeader
                            title="Product Reviews:"
                            />
                            <CardContent>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Fragment>
          );
    }
}

const styles = theme => ({
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridGap: `${theme.spacing.unit * 3}px`,
      margin: theme.spacing.unit *5
    },
    divider: {
      margin: `${theme.spacing.unit * 2}px 0`,
    },
    actions: {
        display: 'flex',
    }
  });


const mapStateToProps = ({orders, products, authenticatedUser}, {match}) => {
    const id = parseInt(match.params.id)
    return {
        product: getProductById(products, id),
        cart: getCartWithItems(orders, products),
        userId: authenticatedUser.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createCart: (item, userId) => dispatch(createCart(item, userId)),
        createLineItemInCart: (cartId, item, userId) => dispatch(createLineItemInCart(cartId, item, userId)),
        updateLineItemInCart: (cartId, quantity, itemId, price, userId) => dispatch(updateLineItemInCart(cartId, { quantity, price }, itemId, userId)),
    }
}

ProductDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductDetail));