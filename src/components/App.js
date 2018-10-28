import React, { Component, Fragment } from 'react';
import { getUsers, exchangeTokenForAuth, getProducts, getOrders } from '../store';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from './Nav';
import Users from './Users';
import User from './User';
import Products from './Products';
import ProductDetails from './ProductDetails';
import Home from './Home';
import Login from './Login';
import RegisterUser from './RegisterUser';
import AdminManagement from './AdminManagement';
import Cart from './Cart'

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
    return (
      <Router>
        <Fragment>
          <Route path="/" render={({ history }) => <Nav history={history} />} />
          <Switch>
            <Route exact path="/users" component={Users} />
            <Route path="/users/:id" component={User} />
            <Route
              path="/login"
              render={({ history }) => <Login history={history} />}
            />
            <Route path="/register" component={RegisterUser} />
            <Route path="/adminManagement" component={AdminManagement} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/:id" component={ProductDetails} />
            <Route path="/cart" component={Cart} />
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
