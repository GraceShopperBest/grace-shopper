import React, { Fragment } from 'react';

import { Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';

const AdminHome = () => {

  return (
    <Grid container justify="center" spacing={32}>
      <Paper elevation={5} style={{backgroundColor: '#EEEEEE', padding: '10px', textAlign: 'center' }}>

        <br />

        <Typography
          variant="h3"
          gutterBottom
          style={{ color: 'dodgerblue'}}
        >
          Grace Shopper Admin Console
        </Typography>

        <br />

        <Typography
          variant="h4"
          gutterBottom
        >
          Quick Links
        </Typography>

        <div style={{ margin: "0 auto" }}>
          <List component="nav">

            <ListItem button>
              {/* <ListItemIcon>
                <InboxIcon />
              </ListItemIcon> */}
              <ListItemText primary="Create User" />
            </ListItem>

            <ListItem button>
              {/* <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon> */}
              <ListItemText primary="Search Products" />
            </ListItem>

            <ListItem button>
              {/* <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon> */}
              <ListItemText primary="Modify Order" />
            </ListItem>

          </List>
        </div>

      </Paper>
    </Grid>
  )

}



export default AdminHome;