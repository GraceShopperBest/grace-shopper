import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Grid, Button, TextField, Typography } from '@material-ui/core'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import { login } from '../store'

class Login extends Component {

    constructor() {
        super()
        this.state = {
            userName: '',
            password: '',
            error: ''
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    handleLogin(event) {
        const { userName, password } = this.state
        event.preventDefault()
        this.props.login({ userName, password })
            .then(() => this.props.history.push('/'))
            .catch(error => {
                this.setState({ error: error.message })
            })
    }

    render () {

        const { userName, password, error } = this.state
        const { handleChange, handleLogin } = this

        return (
            <Grid container justify="center" >
                <Grid item xs>
                    <div style={{marginTop: 25, marginBottom: 25, height: "80vh"}}>
                        <Grid container justify="center"  >
                            <Grid container justify="center">
                                <Grid item>
                                    <AccountBoxIcon style={{fontSize: "25vh"}} />
                                </Grid>
                            </Grid>

                            <Grid container justify="center">
                                <Grid item>
                                    <form style={{display: "flex", flexDirection: "column", width: "30vw"}}>
                                        <TextField required id="userName" label="Username" variant="outlined" style={styles.element}
                                            value={userName} onChange={handleChange('userName')} />

                                        <TextField required id="password" label="Password" variant="outlined" style={styles.element}
                                            value={password} type="password" onChange={handleChange('password')} />

                                        <Button variant="contained" style={{width: "10vw", height: "6vh", margin: 10}}
                                            onClick={handleLogin} disabled={!userName || !password }>
                                            Login
                                        </Button>

                                        <Typography variant="subheading">New User?
                                            <Link to="/register">Register Here</Link>
                                        </Typography>

                                        {
                                            error 
                                                ? <Typography variant="subheading" style={{ color: "red"}}>Invalid Username or password</Typography> 
                                                : ""
                                        }
                                    </form>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (credentials) => dispatch(login(credentials)),
    } 
}

const styles = {
    element: { margin: 10 }
}

export default connect(null, mapDispatchToProps)(Login)