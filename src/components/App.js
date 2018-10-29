import React, { Component, Fragment } from 'react';
import { getUsers, exchangeTokenForAuth, getProducts, getOrders } from '../store';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from './Nav';
import User from './User';
import Products from './Products';
import ProductDetails from './ProductDetails';
import Home from './Home';
import Login from './Login';
import RegisterUser from './RegisterUser';
import Admin from './Admin';
import Cart from './Cart'
import OrderConfirmation from './OrderConfirmation'





class App extends Component {
  componentDidMount() {
    this.props.getUsers();
    this.props.getProducts();
    this.props.exchangeTokenForAuth()
  }

  componentDidUpdate(prevProps) {
    if(this.props.authenticatedUser.id) {
      if((!prevProps.authenticatedUser.id) || (prevProps.authenticatedUser.id !== this.props.authenticatedUser.id)) {
        this.props.getOrders(this.props.authenticatedUser.id)
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

            {
              authenticatedUser.isAdmin ? <Route path="/admins" component={Admin} /> : null
            }

            <Route exact path="/products" component={Products} />
            <Route path="/products/:id" component={ProductDetails} />
            <Route path="/cart" render={({ history }) => <Cart history={history} /> } />
            <Route exact path="/orderConfirmation" component={OrderConfirmation} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

const mapStateToProps = ({ authenticatedUser }) => {
  return {
    authenticatedUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(getUsers()),
    getProducts: () => dispatch(getProducts()),
    exchangeTokenForAuth: () => dispatch(exchangeTokenForAuth()),
    getOrders: (userId) => dispatch(getOrders(userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
