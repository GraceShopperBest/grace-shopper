import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import UserOrderHeading from './UserOrderHeading';
import UserOrderLineItems from './UserOrderLineItems';

import Paper from '@material-ui/core/Paper';



const UserOrder = ({ order, products }) => {

  return (
    <Fragment>

      <Paper elevation={10} style={{backgroundColor: 'lightgray', padding: '10px' }}>

        <UserOrderHeading order={ order } />
        <br />
        <UserOrderLineItems order={ order } products={ products }/>
    
      </Paper>

      <br />
      <br />

    </Fragment>
  )


}

const mapStateToProps = ({ products }) => {
  return {
    products
  }
}

export default connect(mapStateToProps)(UserOrder);
