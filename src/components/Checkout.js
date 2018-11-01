import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Typography, List, ListItem, Grid, TextField, Button, Paper } from '@material-ui/core'
import { placeOrder } from '../store'

class Cart extends Component {

    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            address: '',
            email: '',
            cardName: '',
            cardNumber: '',
            cvvCode: '',
            expiration: ''
        }
        this.handlePlaceOrder = this.handlePlaceOrder.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        const { authenticatedUser } = this.props
        const { firstName, lastName, address, email } = authenticatedUser
        this.setState({ firstName, lastName, email, address: address ? address : '' })
    }

    handlePlaceOrder() {
        const { id } = this.props.location.details.cart
        const { userId } = this.props
        this.props.placeOrder({ id, type: 'ORDER' }, userId)
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    render() {
        const { handlePlaceOrder } = this
        const { cart, totalAmount } = this.props.location.details
        const { firstName, lastName, address, email, cardName, cardNumber, cvv, expiration } = this.state
        const { handleChange } = this

        const paymentDetails = () => {
            return (
                <Grid item xs>
                    <form style={{display: "flex", flexDirection: "column", width: "30vw"}}>
                        <Typography variant="title" style={styles.element}>Payment Details</Typography>
                        <TextField required id="cardName" label="Name on Card" variant="outlined" style={styles.element} 
                            value={cardName} onChange={handleChange('cardName')} /> 
                        <TextField required id="cardNumber" label="Card Number" variant="outlined" style={styles.element} 
                            value={cardNumber} onChange={handleChange('cardNumber')} /> 
                        <TextField required id="cvv" label="CVV Code" variant="outlined" style={styles.element} 
                            value={cvv} onChange={handleChange('cvv')} /> 
                        <TextField required id="expiration" label="Card Expiration" variant="outlined" style={styles.element} 
                            value={expiration} onChange={handleChange('expiration')} /> 
                    </form>
                </Grid>
            )
        }

        const shippingDetails = () => {
            return (
                <Grid item xs={6}>
                    <form style={{display: "flex", flexDirection: "column", width: "30vw"}} >
                        <Typography variant="title" style={styles.element}>Shipping Details</Typography>
                        <TextField required id="firstName" label="First Name" variant="outlined" style={styles.element} 
                            value={firstName} onChange={handleChange('firstName')} /> 
                        <TextField required id="lastName" label="Last Name" variant="outlined" style={styles.element} 
                            value={lastName} onChange={handleChange('lastName')} />
                        <TextField required id="address" label="Address" variant="outlined" style={styles.element} 
                            value={address} onChange={handleChange('address')} />
                        <TextField required id="email" label="Email" variant="outlined" style={styles.element} 
                            value={email} onChange={handleChange('email')} />
                    </form>
                </Grid>
            )
        }

        const orderDetails = () => {
            return (
                <Grid item xs style={{flexGrow: 1}}>
                    <Typography variant="title" style={styles.element}>Order Details</Typography>
                    <Grid container justify="center" style={{display: "flex", flexDirection: "column"}}>
                        {
                            cart.line_items.map((item, index) => <Grid container key={index}>
                                <Grid item xs={6}>
                                    <Typography variant="subheading">{item.product.title}</Typography>
                                    <img src={item.product.primaryImageUrl} style={{height: "15vh" }}/>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="subheading">{`Qty: ${item.quantity}`}</Typography>
                                    <Typography variant="subheading">{`$ ${parseFloat(item.product.price * item.quantity).toFixed(2)}`}</Typography>
                                    <br />
                                </Grid>
                            </Grid>
                            )
                        }
                        </Grid>
                        <Grid container style={{display: "flex", flexDirection: "column", marginTop: "1vh"}} >
                            <Typography style={{fontWeight: "bold"}} variant="subheading">{`Total Amount: $ ${parseFloat(totalAmount).toFixed(2)}`}</Typography>
                            <Button onClick={handlePlaceOrder} variant="outlined" color="primary" style={{width: "10vw"}}> Place Order </Button>
                        </Grid>
                    </Grid>
            )
        }

        return (
            <Fragment>
                <Grid container justify="center" style={{marginTop: "10vh", display:"flex"}}>
                    <Grid item xs>
                        <Grid container style={{display: "flex", flexDirection: "column"}} >
                            { paymentDetails() }
                            <br />
                            { shippingDetails() }
                        </Grid>
                    </Grid>
                    <Grid item xs>
                        <Grid container >
                            { orderDetails() }
                        </Grid>
                    </Grid>
                </Grid>
            </Fragment>
        )

        
    }

}

const mapStateToProps = ({ authenticatedUser }) => {
    return {
        authenticatedUser
    }
}

const mapDispatchToProps = (dispatch, {history}) => {
    return {
        placeOrder: (order, userId) => dispatch(placeOrder(order, userId, history)),
    }
}

const styles = {
    element: { margin: 10 }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)