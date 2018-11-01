import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const searchUsers = (users, search) => {

    // creates regex pattern, to search for - 
    // in any part of field, and
    // ignore case
    const pattern = new RegExp([search], 'gi')
    
    // return all user objects that match search in field passed in as arg
    return users.filter(user => Object.values(user).toString().search(pattern) !== -1);
  }

class AdminUsers extends Component {
    
    constructor() {
        super();
        this.state = {
            search: '',
            users: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShowAllUsers = this.handleShowAllUsers.bind(this);
    }

    componentDidMount() {
        const { users } = this.props;

        this.setState({ users })
    }

    handleChange(event) {
        this.setState({ search: event.target.value })
    }

    handleSubmit(event) {
        const { users } = this.props;
        const { search } = this.state;

        event.preventDefault();
        this.setState({ users: searchUsers(users, search) })
    }

    // toggle to show all users again
    handleShowAllUsers() {
        this.setState({ users: this.props.users })
    }


    render() {
        const { handleChange, handleSubmit, handleShowAllUsers } = this;
        const { users } = this.state;

    return (
        
        <Fragment>

            <h2>Grace Shopper Users</h2>

            <form onSubmit={ handleSubmit }>
                <label>Search for user:</label>
                <input type="text" name="search" onChange={ handleChange } />
                <button type="submit">Search</button>
                <button type="button" onClick={ () => handleShowAllUsers() }>Show All users</button>
            </form>   

            <br />
            <br />

            <table>
                <tbody>
                    <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    </tr>
                        {
                            users.map((user) => {
                                return (
                                <tr key={ user.id }>
                                    <td>
                                        <Link to={`/users/${user.id}`}>
                                            { user.firstName }
                                        </Link>
                                    </td>
                                    <td>{ user.lastName }</td>
                                    <td>{ user.userName }</td>
                                    <td>{ user.email }</td>
                                </tr>
                                )
                            })
                        }
                </tbody>
            </table>

        </Fragment>
    )
}
}

const mapStateToProps = ({ users }) => {

    return {
        users
    };
};

export default connect(mapStateToProps)(AdminUsers);
