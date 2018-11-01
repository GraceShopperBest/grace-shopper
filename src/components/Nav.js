import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppBar, Toolbar, IconButton, Button, Badge, InputBase, Menu, MenuItem } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { logout, getCartWithItems, resetOrders } from '../store'

class Nav extends Component {

    constructor() {
        super()
        this.state = {
            anchorEl: null
        }
        this.handleProfileMenu = this.handleProfileMenu.bind(this)
        this.handleProfileMenuClose = this.handleProfileMenuClose.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleProfileMenu(event) {
        this.setState({ anchorEl: event.currentTarget })
    }

    handleProfileMenuClose() {
        this.setState({ anchorEl: null })
    }

    handleLogout() {
        this.props.logout()
        this.handleProfileMenuClose()
        this.props.resetOrders()
        this.props.history.push('/')
    }

    render() {
        const { authenticatedUser, cart } = this.props
        const { anchorEl } = this.state
        const { handleProfileMenu, handleProfileMenuClose, handleLogout } = this
        const isOpen = Boolean(anchorEl)
        const itemsInCart = cart.line_items.reduce((result, input) => (result + input.quantity), 0)

        const loggedInUserSettings = () => {
            return (
                <Fragment>
                    <IconButton onClick={ handleProfileMenu } 
                            aria-owns={isOpen ? 'profile-menu' : null} aria-haspopup="true">
                        <AccountCircleIcon />
                    </IconButton>
                    <Menu id="profile-menu" anchorEl={anchorEl} open={isOpen} onClick={handleProfileMenuClose} >
                        <MenuItem to={`/users/${authenticatedUser.id}/myaccount`} component={Link} onClick={handleProfileMenuClose} >Account</MenuItem>
                        {
                            authenticatedUser.isAdmin && 
                            <MenuItem to={`/admins`} component={Link} onClick={handleProfileMenuClose} >Admin Management</MenuItem>
                        }
                        <MenuItem onClick={handleLogout} >Logout</MenuItem>
                    </Menu>
                </Fragment>
            )
        }

        return (
            <Fragment>
                <AppBar position="static" color="white" >
                    <Toolbar> 
                        <Link to="/">
                            <img src="/public/logo.png" style={{height: "5vh"}}/>
                        </Link>   
                        <div style={{display: "flex", flexGrow: 1, margin: "20px"}}>
                            <InputBase placeholder="Search..." style={{width: "30vw", border: "1px solid silver", height: "4vh"}}/>
                            <IconButton >
                                <SearchIcon  />
                            </IconButton>
                        </div>
                        <IconButton to="/cart" component={Link}>
                        {
                            itemsInCart ? 
                                <Badge badgeContent={`${itemsInCart}`} color="secondary">
                                    <ShoppingCartIcon />
                                </Badge>
                                : <ShoppingCartIcon />
                        }              
                        </IconButton>                
                        { 
                            !authenticatedUser.id 
                                ?  <Button to="/login" component= {Link}>Login</Button> 
                                : loggedInUserSettings()
                        } 
                    </Toolbar>
                </AppBar>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ orders, products, authenticatedUser, localCart }) => {
    return {
        cart: getCartWithItems(orders, products, localCart),
        authenticatedUser
    }
}

const mapDispatchToProps = (dispatch ) => {
    return {
        logout: () => dispatch(logout()),
        resetOrders: () => dispatch(resetOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
