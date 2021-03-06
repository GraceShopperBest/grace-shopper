import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const AdminHome = () => {
  return (
    <Grid container justify="center" spacing={32}>
      <Paper
        elevation={5}
        style={{
          backgroundColor: '#EEEEEE',
          padding: '10px',
          textAlign: 'center',
        }}
      >
        <br />

        <Typography variant="h3" gutterBottom style={{ color: 'dodgerblue' }}>
          Grace Shopper Admin Console
        </Typography>

        <br />

        <Typography variant="h4" gutterBottom>
          Quick Links
        </Typography>

        <div style={{ margin: '0 auto' }}>
          <List component="nav">
            <ListItem button component={Link} to="/admins/user-create">
              {/* <ListItemIcon>
                <InboxIcon />
              </ListItemIcon> */}
              <ListItemText
                primary="Create User"
                style={{ textAlign: 'center' }}
              />
            </ListItem>

            <ListItem button component={Link} to="/admins/product-create">
              {/* <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon> */}
              <ListItemText
                primary="Create Product"
                style={{ textAlign: 'center' }}
              />
            </ListItem>

            <ListItem button component={Link} to="/admins/product-search">
              {/* <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon> */}
              <ListItemText
                primary="Manage Products"
                style={{ textAlign: 'center' }}
              />
            </ListItem>
          </List>
        </div>
      </Paper>
    </Grid>
  );
};

export default AdminHome;
