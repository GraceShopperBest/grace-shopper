import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Typography, List, ListItem, Grid, TextField, Button, Paper } from '@material-ui/core'
import { placeOrder } from '../store'



const styles = {
    title: { color: "dodgerblue", marginBottom: "25px" },
    field: { margin: 10 }
}


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
                <Grid item>
                    <form
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "30vw",
                            marginLeft: "25px"
                        }}>
                        <Typography
                            variant="h3"
                            style={styles.title}
                        >
                            Payment Details
                        </Typography>
                        
                        <TextField
                            required
                            id="cardName"
                            label="Name on Card"
                            variant="outlined"
                            style={styles.field} 
                            value={cardName}
                            onChange={handleChange('cardName')}
                        />

                        <TextField
                            required
                            id="cardNumber"
                            label="Card Number"
                            variant="outlined"
                            style={styles.field} 
                            value={cardNumber}
                            onChange={handleChange('cardNumber')}
                        />

                        <TextField
                            required id="cvv"
                            label="CVV Code"
                            variant="outlined"
                            style={styles.field} 
                            value={cvv}
                            onChange={handleChange('cvv')}
                        /> 

                        <TextField
                            required
                            id="expiration"
                            label="Card Expiration"
                            variant="outlined"
                            style={styles.field} 
                            value={expiration}
                            onChange={handleChange('expiration')}
                        />

                    </form>
                </Grid>
            )
        }

        const shippingDetails = () => {
            return (
                <Grid item xs={6}>

                    <form style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "30vw",
                        marginLeft: "25px"
                    }}>

                    <Typography
                        variant="h3"
                        style={styles.title}
                    >
                        Shipping Details
                    </Typography>
                    
                    <TextField
                        required
                        id="firstName"
                        label="First Name"
                        variant="outlined"
                        style={styles.field} 
                        value={firstName}
                        onChange={handleChange('firstName')}
                    /> 
                    
                    <TextField
                        required
                        id="lastName"
                        label="Last Name"
                        variant="outlined"
                        style={styles.field} 
                        value={lastName}
                        onChange={handleChange('lastName')}
                    />
                    
                    <TextField
                        required
                        id="address"
                        label="Address"
                        variant="outlined"
                        style={styles.field} 
                        value={address}
                        onChange={handleChange('address')}
                    />
                    
                    <TextField required id="email" label="Email" variant="outlined" style={styles.field} 
                        value={email} onChange={handleChange('email')} />
                    </form>
                </Grid>
            )
        }

        const orderDetails = () => {
            return (
                <Grid
                    container
                    direction="column"
                    style={{ width: "600px" }}
                >
                    <Grid item>
                        <Typography
                            variant="h3"
                            style={ styles.title }
                        >
                            Order Details
                        </Typography>
                    </Grid>

                    <Grid item>
                        
                        <Grid
                            container
                            justify="center"
                            direction="column"
                        >
                            {
                                cart.line_items.map((item, index) => {
                                
                                    return (
                                    
                                        <Grid
                                            container
                                            key={index}
                                            style={{ marginLeft: "20px" }}
                                        >

                                            <Grid item xs={6}>
                                                <Typography
                                                    variant="h6"
                                                >
                                                    {item.product.title}
                                                </Typography>
                                                <img
                                                    src={item.product.primaryImageUrl} 
                                                    style={{ height: "15vh", marginTop: "10px" }}
                                                />
                                            </Grid>

                                            <Grid item xs={3}>
                                                <Typography 
                                                    variant="subheading"
                                                >
                                                    {`Qty: ${item.quantity}`}
                                                </Typography>
                                                
                                                <Typography
                                                    variant="subheading"
                                                >
                                                    {`$ ${parseFloat(item.product.price * item.quantity).toFixed(2)}`}
                                                </Typography>

                                                <br />
                                            </Grid>

                                        </Grid>
                                    )}
                                )
                            }
                        </Grid>

                    </Grid>

                    <Grid
                        container
                        direction="column"
                        justify="center"
                        style={{ width: "300px" }}
                    >

                        <Grid item>
                            <Typography
                                style={{ fontWeight: "bold", marginBottom: "10px" }}
                                variant="subheading"
                            >
                                {`Total Amount: $ ${parseFloat(totalAmount).toFixed(2)}`}
                            </Typography>
                        </Grid>
                        
                        <Grid item>
                            <Button
                                onClick={ handlePlaceOrder }
                                variant="contained"
                                color="primary"
                                style={{width: "10vw"}}
                            >
                                Place Order
                            </Button>
                        </Grid>

                    </Grid>

                    <br />
                    <br />

                </Grid>
            )
        }

        return (
            <Fragment>
                <Grid
                    container
                    justify="center"
                    style={{ marginTop: "10vh", marginLeft: "20px" }}
                >

                    <Grid item>
                        <Grid
                            container
                            spacing={32}
                            direction="column"
                            style={ { width: "600px" }}
                        >
                            <Grid item>
                                { paymentDetails() }
                            </Grid>
                            <Grid item>
                                { shippingDetails() }
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Paper
                            elevation={10}
                            style={{
                                padding: '10px',
                                width: "600px"
                            }}>
                                { orderDetails() }
                        </Paper>
                    </Grid>

                </Grid>

                <br />
                <br />
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


export default connect(mapStateToProps, mapDispatchToProps)(Cart)
