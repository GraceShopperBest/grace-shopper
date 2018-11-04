import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUser } from '../../../store';
import {
  Divider,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';

class AdminUserCreate extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
      email: '',
      address: '',
      isAdmin: false,
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const userName = this.state.userName;
    const password = this.state.password;
    const email = this.state.email;
    const address = this.state.address;
    const isAdmin = this.state.isAdmin;
    evt.preventDefault();

    this.props
      .addUser({
        firstName,
        lastName,
        userName,
        password,
        email,
        address,
        isAdmin,
      })
      .then(() => this.props.history.push('/admins/users'));
  }
  onChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  render() {
    const { handleSubmit, onChange } = this;
    const {
      firstName,
      lastName,
      userName,
      password,
      email,
      address,
      isAdmin,
    } = this.state;

    const isValidEmail = email => {
      const regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
      return regExp.test(String(email));
    };

    return (
      <form onSubmit={handleSubmit}>
        <Typography variant="h2" gutterBottom style={{ color: 'dodgerblue' }}>
          Add A User
        </Typography>
        <TextField
          required
          name="firstName"
          label="First Name"
          variant="outlined"
          margin="normal"
          value={firstName}
          onChange={onChange}
          style={{ width: '700px' }}
        />

        <TextField
          required
          name="lastName"
          label="Last Name"
          margin="normal"
          variant="outlined"
          value={lastName}
          onChange={onChange}
          style={{ width: '700px' }}
        />

        <TextField
          required
          name="userName"
          label="Username"
          variant="outlined"
          margin="normal"
          value={userName}
          onChange={onChange}
          style={{ width: '700px' }}
        />

        <TextField
          required
          name="password"
          label="Password"
          variant="outlined"
          value={password}
          margin="normal"
          type="password"
          onChange={onChange}
          style={{ width: '700px' }}
        />

        <TextField
          required
          name="email"
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={onChange}
          style={{ width: '700px' }}
          error={email.length > 0 && !isValidEmail(email)}
        />

        <TextField
          required
          multiline
          rows="3"
          name="address"
          label="Address"
          variant="outlined"
          margin="normal"
          value={address}
          onChange={onChange}
          style={{ width: '700px' }}
        />

        <br />
        <br />
        <FormControlLabel
          control={
            <Checkbox
              checked={isAdmin}
              onChange={e => this.setState({ isAdmin: !isAdmin })}
            />
          }
          label="Is Admin?"
        />
        <br />
        <br />
        <Divider />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ width: '100px' }}
        >
          Submit
        </Button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: user => dispatch(addUser(user)),
  };
};
export default connect(
  null,
  mapDispatchToProps
)(AdminUserCreate);
