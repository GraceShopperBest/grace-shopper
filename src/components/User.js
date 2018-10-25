import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserById} from './../reducers/UserReducer';

class User extends Component {

    render() {
        const {user} = this.props;
        return (
            <div className='userContainer'>
                <div >
                    {user.firstName} {user.lastName} {user.email} {user.userName}
                </div>
            </div>
        )
    }
};

const mapStateToProps = ({users}, {match}) => {
    const id = parseInt(match.params.id)
    return {
        user: getUserById(users, id),
    }
};

export default connect(mapStateToProps)(User);
