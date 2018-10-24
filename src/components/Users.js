import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

const Users = ({ users }) => {
    console.log('HERE ', users)
    return (
        <div className='usersContainer'>
        <h2>List of all users: </h2>
        <table className='users-list'>
            <tbody>
              <tr>
                <th>FIRST NAME</th>
                <th>LAST NAME</th>
                <th>USERNAME</th>
              </tr>
              {
                users.map((user) => {
                  return (
                    <tr key={user.id}>
                        <td>
                            <Link to={`/users/${user.id}`}>
                                {user.firstName} {user.lastName}
                            </Link>
                        </td>
                        <td>{user.userName}</td>
                        <td>{user.email}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          </div>
    )
};

const mapStateToProps = (state) => {
    return {
        users: state.users
    };
};

export default connect(mapStateToProps)(Users);