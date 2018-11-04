import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { updateUser, deleteUser } from '../../../store';

import {
  Grid,
  TextField,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';

class AdminUserUpdate extends Component {
  constructor(props) {
    super(props);
    const user = this.props.user;
    this.state = {
      firstName: user ? user.firstName : '',
      lastName: user ? user.lastName : '',
      email: user ? user.email : '',
      userName: user ? user.userName : '',
      password: user ? user.password : '',
      address: user ? user.address : '',
      isAdmin: user ? user.isAdmin : 'false',
    };

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.user && this.props.user) {
      this.setState({
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        email: this.props.user.email,
        userName: this.props.user.userName,
        password: this.props.user.password,
        address: this.props.user.address,
        isAdmin: this.props.user.isAdmin,
      });
    }
  }
  onChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  onSave(evt) {
    evt.preventDefault();
    this.props
      .updateUser({
        id: this.props.user.id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        userName: this.state.userName,
        password: this.state.password,
        address: this.state.address,
        isAdmin: this.state.isAdmin,
      })
      .then(() => this.props.history.push('/admins/users'));
  }

  // confirmPassword() {
  //     const password = document.getElementById('password').value;
  //     // const password1 = document.getElementById('password1').value;
  //     // const password2 = document.getElementById('password2').value;

  //     // if(password1 === password2) {
  //     //    this.setState({ password: 'test' })
  //     //     console.log(password1)
  //     // };
  //     console.log(password === this.state.user.password)
  // }

  render() {
    if (!this.props.user) {
      return null;
    }
    const { onChange, onSave } = this;
    const { user } = this.props;
    const {
      firstName,
      lastName,
      email,
      userName,
      password,
      address,
      isAdmin,
    } = this.state;

    return (
      <Fragment>
        <Typography variant="h2" gutterBottom style={{ color: 'dodgerblue' }}>
          My Account
        </Typography>

        <br />
        <br />

        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>

        <form onSubmit={onSave}>
          <Grid container justify="flex-start" spacing={16}>
            <Grid item>
              <TextField
                required
                name="firstName"
                label="first name"
                margin="normal"
                variant="filled"
                value={firstName}
                onChange={onChange}
              />
            </Grid>

            <Grid item>
              <TextField
                required
                name="lastName"
                label="last name"
                margin="normal"
                variant="filled"
                value={lastName}
                onChange={onChange}
              />
            </Grid>
          </Grid>

          <TextField
            required
            name="email"
            label="email"
            margin="normal"
            variant="filled"
            value={email}
            onChange={onChange}
          />
          <TextField
            required
            name="address"
            label="address"
            margin="normal"
            variant="filled"
            value={address}
            onChange={onChange}
          />

          <br />
          <br />
          <br />
          <br />

          <Typography variant="h4" gutterBottom>
            Login / Security
          </Typography>

          <TextField
            required
            name="username"
            label="username"
            margin="normal"
            variant="filled"
            value={userName}
            onChange={onChange}
          />

          <br />
          <br />

          {/* <Typography variant="subtitle1" style={{ color: 'red' }}gutterBottom>Change Password</Typography> */}

          <TextField
            required
            id="password"
            name="password"
            label="current password"
            type="password"
            margin="normal"
            variant="filled"
            value={password}
            onChange={onChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isAdmin}
                onChange={e => this.setState({ isAdmin: !isAdmin })}
              />
            }
            label="Is Admin?"
          />

          {/* <Grid container justify="flex-start" spacing={16}>
                
                    <Grid item>
                        <TextField
                            // required
                            id="password1"
                            // name="password"
                            label="new password"
                            name="password1"
                            type="password"
                            margin="normal"
                            variant="filled"
                            onChange={ handleChange }
                        />
                    </Grid>
        
                    <Grid item>
                        <TextField
                            // required
                            id="password2"
                            // name="password"
                            label="confirm password"
                            name="password2"
                            type="password"
                            margin="normal"
                            variant="filled"
                            onChange={ handleChange }
                        />
                    </Grid>
        
                  </Grid> */}

          <br />
          <br />

          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => this.props.deleteUser(user)}
          >
            Delete
          </Button>
        </form>

        <br />
        <br />
      </Fragment>
    );
  }
}
const mapStateToProps = ({ users }, { match }) => {
  const user = users.find(s => s.id === match.params.id * 1);
  return {
    user,
    users,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user)),
    deleteUser: user => dispatch(deleteUser(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUserUpdate);
