import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = ({ path }) => {
    return (
        <ul>
            <li><Link to='/users'>Users </Link></li>
        </ul>
    )
}

const mapStatetoProps = ({ users }, {path}) => {
    return {
        users,
        path
    }
}

export default connect(mapStatetoProps)(Nav);