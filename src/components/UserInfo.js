import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { updateUser } from './../reducers/UserReducer';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class UserInfo extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        password: '',
        address: '',
      },
      status: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;

    if (!user) {
      return null;
    }

    this.setState({ user });
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;

    if (prevProps !== this.props) {
      this.setState({ user });
    }
  }

  handleChange(event) {
    const user = Object.assign({}, this.state.user, {
      [event.target.name]: event.target.value,
    });
    this.setState({ user });
  }

  handleSubmit(event) {
    const { onUpdateUser } = this.props;

    event.preventDefault();
    // this.confirmPassword();
    onUpdateUser(this.state.user);
    this.setState({ status: 'Account Updated!' });
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
    const { handleChange, handleSubmit } = this;
    const {
      firstName,
      lastName,
      email,
      userName,
      password,
      address,
    } = this.state.user;
    const { status } = this.state;

    return (
      <Fragment>
        <Typography variant="h2" gutterBottom style={{ color: 'dodgerblue' }}>
          My Account
        </Typography>

        <Typography variant="subtitle1" style={{ color: 'green' }} gutterBottom>
          {status}
        </Typography>

        <br />
        <br />

        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container justify="flex-start" spacing={16}>
            <Grid item>
              <TextField
                required
                name="firstName"
                label="first name"
                margin="normal"
                variant="filled"
                value={firstName}
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container justify="flex-start" spacing={16}>
            <Grid item>
              <TextField
                required
                name="email"
                label="email"
                margin="normal"
                variant="filled"
                value={email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                name="address"
                label="address"
                margin="normal"
                variant="filled"
                value={address}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

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
            onChange={handleChange}
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
            onChange={handleChange}
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
        </form>

        <br />
        <br />
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateUser: user => dispatch(updateUser(user)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UserInfo);
