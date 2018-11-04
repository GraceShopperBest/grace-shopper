import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Divider
} from '@material-ui/core';
import { connect } from 'react-redux';
import { getProductById } from './../utils';
import {
  createCart,
  getCartWithItems,
  createLineItemInCart,
  updateLineItemInCart,
} from '../store';
import ProductImageCarousel from './ProductImageCarousel';
import ItemQuantity from './ItemQuantity';
import Reviews from './Reviews';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  handleAddToCart(productId, quantity, price) {
    const item = { productId, quantity, price };
    const {
      cart,
      createCart,
      createLineItemInCart,
      updateLineItemInCart,
      userId,
    } = this.props;
    if (!cart.id && userId) {
      createCart(item, userId);
    } else {
      const lineItem = cart.line_items.find(
        i => i.productId === item.productId
      );
      if (!lineItem) {
        createLineItemInCart(cart.id, item, userId);
      } else {
        updateLineItemInCart(
          cart.id,
          item.quantity + lineItem.quantity,
          lineItem.id,
          price,
          userId,
          item.productId
        );
      }
    }
  }

  render() {
    const { classes, reviews, product } = this.props;
    const { handleAddToCart } = this;

    if(!product) return null;

    const findReviews = reviews.filter(
      review => review.productId === product.id
    );

    const averageRating = reviews => {
      let arr = [];
      reviews.forEach(review => arr.push(review.rating));
      return (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2);
    };

    let images;
    product.images ? images = product.images : images = []
    if(!images || images.length === 0){
      images.push(product.primaryImageUrl)
    } else {
      images.unshift(product.primaryImageUrl);
    }
    return (
      <Fragment>
        <div className={classes.container}>
          <div style={{ gridColumnEnd: 'span 6' }}>
            <ProductImageCarousel images={images} />
          </div>
          <div style={{ gridColumnEnd: 'span 6' }}>
            <Card className={classes.card}>
              <CardHeader title={product.title} subheader={product.author} />
              <CardContent>
                <Typography
                  component="p"
                  variant="subheading"
                  gutterBottom={true}
                >
                  Price: ${product.price}
                </Typography>
                <Divider className={classes.divider}/>
                <Typography paragraph variant="subheading">
                  Average Rating:{' '}
                  {findReviews.length === 0
                    ? 'Be the first to review'
                    : averageRating(findReviews)}
                </Typography>
                <Typography paragraph variant="subheading" gutterBottom={true}>
                  Product Details:
                </Typography>
                <Typography paragraph>{product.description}</Typography>
              </CardContent>
              <CardActions className={classes.actions} disableActionSpacing>
                <ItemQuantity
                  addToCart={handleAddToCart}
                  productId={product.id}
                  price={product.price}
                />
              </CardActions>
            </Card>
          </div>
        </div>
        <div className={classes.container}>
          <div style={{ gridColumnEnd: 'span 12' }}>
            <Reviews id={product.id} />
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
    margin: theme.spacing.unit * 5,
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`,
  },
  actions: {
    display: 'flex',
  },
});

const mapStateToProps = (
  { orders, products, authenticatedUser, reviews, localCart },
  { match }
) => {
  const id = parseInt(match.params.id);
  return {
    product: getProductById(products, id),
    cart: getCartWithItems(orders, products, localCart),
    userId: authenticatedUser.id,
    reviews,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createCart: (item, userId) => dispatch(createCart(item, userId)),
    createLineItemInCart: (cartId, item, userId) =>
      dispatch(createLineItemInCart(cartId, item, userId)),
    updateLineItemInCart: (cartId, quantity, itemId, price, userId, productId) =>
      dispatch(
        updateLineItemInCart(cartId, { quantity, price, productId }, itemId, userId)
      ),
  };
};

ProductDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProductDetail));
