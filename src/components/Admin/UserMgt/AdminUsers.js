import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const searchUsers = (users, search) => {
  // creates regex pattern, to search for -
  // in any part of field, and
  // ignore case
  const pattern = new RegExp([search], 'gi');

  // return all user objects that match search in field passed in as arg
  return users.filter(
    user =>
      Object.values(user)
        .toString()
        .search(pattern) !== -1
  );
};
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: 'dodgerblue',
    color: theme.palette.common.white,
    fontSize: 18,
  },
  body: {
    fontSize: 18,
    backgroundColor: 'white',
  },
}))(TableCell);
class AdminUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      users: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShowAllUsers = this.handleShowAllUsers.bind(this);
    this.componentDidUdate = this.componentDidUpdate.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.users && this.props.users) {
      this.setState({ users: this.props.users });
    }
  }
  componentDidMount() {
    this.setState({ users: this.props.users });
  }
  handleChange(event) {
    this.setState({ search: event.target.value });
  }

  handleSubmit(event) {
    const { users } = this.props;
    const { search } = this.state;

    event.preventDefault();

    this.setState({ users: searchUsers(users, search) });
  }

  // toggle to show all users again
  handleShowAllUsers() {
    this.setState({ users: this.props.users });
  }

  render() {
    const { handleChange, handleSubmit, handleShowAllUsers } = this;
    const { search } = this.state;
    const { users } = search !== null ? this.state : this.props;
    return (
      <Fragment>
        <Typography variant="h2" gutterBottom style={{ color: 'dodgerblue' }}>
          Grace Shopper Users
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid
            container
            alignItems="center"
            alignContent="flex-start"
            spacing={16}
          >
            <Grid item>
              <TextField
                name="search"
                placeholder="search..."
                margin="normal"
                variant="filled"
                onChange={handleChange}
                style={{ width: '300px' }}
              />
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" color="primary">
                Search
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="button"
                variant="contained"
                color="secondary"
                onClick={() => handleShowAllUsers()}
              >
                Show All
              </Button>
            </Grid>
          </Grid>
        </form>

        <br />
        <br />

        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell>First Name</CustomTableCell>
              <CustomTableCell style={{ textAlign: 'center' }}>
                Last Name
              </CustomTableCell>
              <CustomTableCell style={{ textAlign: 'center' }}>
                Username
              </CustomTableCell>
              <CustomTableCell style={{ textAlign: 'center' }}>
                Email
              </CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => {
              return (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    <Link
                      to={`/admins/users/${user.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      {user.firstName}
                    </Link>
                  </TableCell>
                  <TableCell
                    style={{ textAlign: 'center' }}
                    component="th"
                    scope="row"
                  >
                    {user.lastName}
                  </TableCell>
                  <TableCell
                    style={{ textAlign: 'center' }}
                    component="th"
                    scope="row"
                  >
                    {user.userName}
                  </TableCell>
                  <TableCell
                    style={{ textAlign: 'center' }}
                    component="th"
                    scope="row"
                  >
                    {user.email}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users,
  };
};

export default connect(mapStateToProps)(AdminUsers);
