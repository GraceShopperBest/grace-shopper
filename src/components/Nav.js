import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, IconButton, Button, Badge, InputBase } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import SearchIcon from '@material-ui/icons/Search'

// TO DO: Need to be a connected component to get the items in the cart (once store is ready)
const Nav = () => {
    return (
        <Fragment>
            <AppBar position="static" color="white" >
                <Toolbar> 
                    <Link to="/">
                        <img src="/public/logo.png" style={{height: "5vh"}}/>
                    </Link>   
                    <div style={{display: "flex", flexGrow: 1, margin: "20px"}}>
                        <InputBase placeholder="Search..." style={{width: "30vw", border: "1px solid silver", height: "4vh"}}/>
                        <SearchIcon  style={{height: "4vh", width: "5vw"}} />
                    </div>
                    <IconButton to="/cart" component={Link}>
                        <Badge badgeContent="TBD" color="secondary">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    <Button>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </Fragment>
    )
}


export default Nav