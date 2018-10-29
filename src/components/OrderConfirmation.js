import React, { Fragment } from 'react'
import { Typography } from '@material-ui/core'

const OrderConfirmation = () => {
    return (
        <Fragment>
            <Typography variant="title" style={{marginTop: "10vh", marginBottom: "5vh", fontWeight: "bold"}}>
                Thank You for your order!
            </Typography>
            <Typography variant="subheading">
                Thank You. Your order has been received.
            </Typography>
        </Fragment>
    )
}

export default OrderConfirmation