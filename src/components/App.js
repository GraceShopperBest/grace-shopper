import React, { Component } from 'react';
import store from './../store';
import {getUsers} from './../reducers/UserReducer';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Users from './Users';
import Nav from './Nav';

export default class App extends Component {
    componentDidMount(){
        store.dispatch(getUsers());
    }

    render() {
        const renderNav = ({location}) => {
            return <Nav path = {location.pathname}/>
        } 
        return (
            <div id = 'main'>
                    <Router>
                    <div>
                        <Route render={ renderNav } />
                        <Switch>
                            <Route exact path='/users' component = {Users} />
                        </Switch> 
                    </div>
                </Router>
            </div>
        )
    }
}