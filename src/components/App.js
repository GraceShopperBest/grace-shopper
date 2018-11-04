import React, { Component, Fragment } from 'react';
import {
  getUsers,
  exchangeTokenForAuth,
  getProducts,
  getOrders,
  getReviews,
  mergeCartWithLocalCartOnLogin,
} from '../store';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from './Nav';
import User from './User';
import Products from './Product/Products';
import PagedProducts from './Product/PagedProducts';
import ProductDetails from './Product/ProductDetails';
import Home from './Home';
import Login from './Login';
import RegisterUser from './RegisterUser';
import AdminTopNav from './Admin/AdminTopNav';
import Cart from './Cart';
import OrderConfirmation from './OrderConfirmation';
import RegistrationSuccessful from './RegistrationSuccessful';
import Checkout from './Checkout';
import AdminUserUpdate from './Admin/UserMgt/AdminUserUpdate';
import AdminUserCreate from './Admin/UserMgt/AdminUserCreate';

class App extends Component {
  componentDidMount() {
    this.props.getUsers();
    this.props.getProducts();
    this.props.exchangeTokenForAuth();
    this.props.getReviews();
  }

  componentDidUpdate(prevProps) {
    const { authenticatedUser } = this.props;
    if (authenticatedUser.id) {
      if (
        !prevProps.authenticatedUser.id ||
        prevProps.authenticatedUser.id !== authenticatedUser.id
      ) {
        this.props
          .getOrders(authenticatedUser.id)
          .then(() =>
            this.props.mergeCartWithLocalCartOnLogin(
              this.props.orders,
              this.props.localCart,
              authenticatedUser.id
            )
          );
      }
    }
  }

  render() {
    const { authenticatedUser } = this.props;

    return (
      <Router>
        <Fragment>
          <Route path="/" render={({ history }) => <Nav history={history} />} />
          <Switch>
            <Route path="/users/:id" component={User} />
            <Route
              path="/login"
              render={({ history }) => <Login history={history} />}
            />
            <Route path="/register" component={RegisterUser} />
            <Route path="/registerSuccess" component={RegistrationSuccessful} />
            <Route
              path="/checkout"
              render={({ location, history }) => (
                <Checkout location={location} history={history} />
              )}
            />

            <Route
              exact
              path="/admins/user-create"
              render={({ history }) => <AdminUserCreate history={history} />}
            />
            <Route exact path="/admins/users" component={AdminTopNav} />
            <Route path="/admins/users/:id" component={AdminUserUpdate} />

            <Route
              exact path="/admins/product-create"
              component={AdminTopNav}
            />
            <Route
              exact path="/admins/product-search"
              component={AdminTopNav}
            />
            <Route exact path="/admins/products/:id" component={AdminTopNav} />
            <Route exact path="/admins/orders" component={AdminTopNav} />
            <Route exact path="/admins" component={AdminTopNav} />

            <Route exact path="/products" component={Products} />
            <Route path="/:categories/products/page/:index?" component={PagedProducts} />
            <Route path="/products/:id" component={ProductDetails} />
            <Route path="/cart" component={Cart} />
            <Route
              exact
              path="/orderConfirmation"
              component={OrderConfirmation}
            />
            <Route exact path="/" component={Home} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

const mapStateToProps = ({ authenticatedUser, orders, localCart }) => {
  return {
    authenticatedUser,
    orders,
    localCart,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(getUsers()),
    getProducts: () => dispatch(getProducts()),
    exchangeTokenForAuth: () => dispatch(exchangeTokenForAuth()),
    getOrders: userId => {
      return dispatch(getOrders(userId));
    },
    getReviews: () => dispatch(getReviews()),
    mergeCartWithLocalCartOnLogin: (orders, localCart, userId) =>
      dispatch(mergeCartWithLocalCartOnLogin(orders, localCart, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
