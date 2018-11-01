import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AdminOrders from './AdminOrders';

import { Grid , List, ListItem, ListItemLink, ListItemText} from '@material-ui/core'



class AdminOrdersMain extends Component {

  constructor() {
    super();
    this.state = {
        adminArea: 'orders' // determines which Component is rendered in main area to the right
    }

    this.handleAdminArea = this.handleAdminArea.bind(this);
  }

  // returns Component to render in main area (to the right) when user area button is clicked
  handleAdminArea(adminArea) {
        
    switch(adminArea) {
        case 'orders':
            return <AdminOrders/>

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
                        button onClick={ () => this.setState({ adminArea: 'orders' }) }
                        component={ Link } 
                        to="/admins/orders"
                        selected={ location.pathname.includes('/admins/orders') }
                    >
                        <ListItemText>All Orders</ListItemText>
                    </ListItem>
              
                </List>
            </Grid>
            <Grid item sm style={style.GridItem}> 
                { handleAdminArea(adminArea) } 
            </Grid>
        </Grid>
  
    )
  }
  
}


export default AdminOrdersMain;



