import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AdminProductCreate from './AdminProductCreate';
import AdminProducts from './AdminProducts';
import AdminProductUpdate from './AdminProductUpdate';

import { Grid , List, ListItem, ListItemText} from '@material-ui/core'



class AdminProductMain extends Component {

  constructor() {
    super();
    this.state = {
        adminArea: 'product-create' // determines which Component is rendered in main area to the right
    }

    this.handleAdminArea = this.handleAdminArea.bind(this);
  }

    componentDidMount() {
        const { location } = this.props;

        // loads correct admin area on refresh depending on URL
        if(location.pathname.includes('admins/product-create')){
            this.setState({ adminArea: 'product-create' })
        }
        else if(location.pathname.includes('admins/product-search')) {
            this.setState({ adminArea: 'product-search' })
        }
        else if(location.pathname.includes('admins/products')) {
            this.setState({ adminArea: 'product-update' })
        }
        else if(location.pathname.includes('admins/product-catalogues')) {
            this.setState({ adminArea: 'catalogues' })
        }
    }

    componentDidUpdate(prevProps) {
        const { location } = this.props;
        if(prevProps !== this.props){

            // loads correct admin area on refresh depending on URL
            if(location.pathname.includes('admins/product-create')){
                this.setState({ adminArea: 'product-create' })
            }
            else if(location.pathname.includes('admins/products/')) {
                this.setState({ adminArea: 'product-update' })
            }
            else if(location.pathname.includes('admins/product-search')) {
                this.setState({ adminArea: 'product-search' })
            }
            else if(location.pathname.includes('admins/product-catalogues')) {
                this.setState({ adminArea: 'catalogues' })
            }
        }
    }

  // returns Component to render in main area (to the right) when user area button is clicked
  handleAdminArea(adminArea) {
    const { match } = this.props;
        

    switch(adminArea) {
        case 'product-create':
            return <AdminProductCreate/>

        case 'product-search':
            return <AdminProducts />

        case 'product-update':
            return <AdminProductUpdate
                location={ location }
                history={ history }
                match={ match }
            />
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
                        button onClick={ () => this.setState({ adminArea: 'product-create' }) }
                        component={ Link } 
                        to="/admins/product-create"
                        selected={ location.pathname.includes('/admins/product-create') }
                    >
                        <ListItemText>Create Product</ListItemText>
                    </ListItem>
  
                    <ListItem
                        button onClick={ () => this.setState({ adminArea: 'product-search' }) }
                        component={ Link } 
                        to="/admins/product-search"
                        selected={ location.pathname.includes('/admins/product-search') ||  location.pathname.includes('/admins/products') }
                    >
                        <ListItemText>Product Search</ListItemText>
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


export default AdminProductMain;



