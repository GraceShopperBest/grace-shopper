import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AdminUserCreate from './AdminUserCreate';
import AdminUsers from './AdminUsers';

import {
  Grid,
  List,
  ListItem,
  ListItemLink,
  ListItemText,
} from '@material-ui/core';

class AdminUsersMain extends Component {
  constructor() {
    super();
    this.state = {
      adminArea: 'users', // determines which Component is rendered in main area to the right
    };

    this.handleAdminArea = this.handleAdminArea.bind(this);
  }

  componentDidMount() {
    const { location } = this.props;
    if (location.pathname.includes('admins/users')) {
      this.setState({ adminArea: 'users' });
    } else if (location.pathname.includes('admins/user-create')) {
      this.setState({ adminArea: 'user-create' });
    }
  }

  // returns Component to render in main area (to the right) when user area button is clicked
  handleAdminArea(adminArea) {
    switch (adminArea) {
      case 'user-create':
        return <AdminUserCreate history={history} />;

      case 'users':
        return <AdminUsers history={history} />;
    }
  }

  render() {
    const { handleAdminArea } = this;
    const { location } = this.props;
    const { adminArea } = this.state;

    const style = {
      GridItem: { padding: 10, marginTop: 10, height: '90vh' },
    };

    return (
      <Grid container spacing={24}>
        <Grid item sm={2} style={style.GridItem}>
          <List>
            <ListItem
              button
              onClick={() => this.setState({ adminArea: 'user-create' })}
              component={Link}
              to="/admins/user-create"
              selected={location.pathname.includes('/admins/user-create')}
            >
              <ListItemText>Create User</ListItemText>
            </ListItem>

            <ListItem
              button
              onClick={() => this.setState({ adminArea: 'users' })}
              component={Link}
              to="/admins/users"
              selected={location.pathname.includes('/admins/users')}
            >
              <ListItemText>Manage Users</ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item sm style={style.GridItem}>
          {handleAdminArea(adminArea)}
        </Grid>
      </Grid>
    );
  }
}

export default AdminUsersMain;
