import React, { Component, Fragment } from 'react';
import store from './../store';
import {getUsers} from './../reducers/UserReducer';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Users from './Users';
import Nav from './Nav';
import User from './User';

export default class App extends Component {
    componentDidMount(){
        store.dispatch(getUsers());
    }

    render() {
        return (
            <div id = 'main'>
                <Router>
                    <Fragment>
                        <Nav />
                        <Switch>
                            <Route exact path='/users' component={Users} />
                            <Route path='/users/:id' component={User} />
                        </Switch> 
                    </Fragment>
                </Router>
            </div>
        )
    }
}