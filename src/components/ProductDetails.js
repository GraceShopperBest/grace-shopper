import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Card, CardHeader, CardContent, CardActions, Typography, Divider } from '@material-ui/core';
import { connect } from 'react-redux';
import { getProductById } from './../utils';
import ProductQty from './ProductQty';
import { createCart, getCartWithItems, createLineItemInCart, updateLineItemInCart } from '../store'
import ProductImageCarousel from './ProductImageCarousel';

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

    handleAddToCart(productId, quantity) {
        const item = { productId, quantity }
        const { cart, createCart, createLineItemInCart, updateLineItemInCart } = this.props
        if(!cart.id) {
            createCart(item)
        }
        else {
            const lineItem = cart.line_items.find(i => i.productId === item.productId )
            if(!lineItem) {                 
                createLineItemInCart(cart.id, item)
            }
            else {                  
                updateLineItemInCart(cart.id, item.quantity, lineItem.id)
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
                            <ProductQty addToCart={handleAddToCart} productId={product.id} />
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


const mapStateToProps = ({orders, products}, {match}) => {
    const id = parseInt(match.params.id)
    return {
        product: getProductById(products, id),
        orders,
        cart: getCartWithItems(orders, products),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createCart: (item) => dispatch(createCart(item)),
        createLineItemInCart: (cartId, item) => dispatch(createLineItemInCart(cartId, item)),
        updateLineItemInCart: (cartId, quantity, itemId) => dispatch(updateLineItemInCart(cartId, { quantity }, itemId)),
    }
}

ProductDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductDetail));