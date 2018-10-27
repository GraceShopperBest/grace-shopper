import React, { Component, Fragment } from 'react'
import { Tabs, Tab } from '@material-ui/core'
import UserManagement from './UserManagement';
import ProductManagement from './ProductManagement';
import OrderManagement from './OrderManagement';

class AdminManagement extends Component {
    
    constructor() {
        super()
        this.state = {
            value: 0
        }
        this.handleChange = this.handleChange.bind(this)     
    }

    handleChange(event, value) {
        this.setState({ value })
    }

    render() {
        const { value } = this.state
        const { handleChange } = this

        return (
            <Fragment>
                <Tabs value={value} onChange={handleChange} centered >
                    <Tab label="Users" />
                    <Tab label="Products" />
                    <Tab label="Orders" />
                </Tabs>
                { value === 0 && <UserManagement />}
                { value === 1 && <ProductManagement />}
                { value === 2 && <OrderManagement />}
            </Fragment>
        )
    }
}

export default AdminManagement