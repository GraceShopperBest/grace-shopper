import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



const searchProducts = (products, search) => {

    // creates regex pattern, to search for - 
    // in any part of field, and
    // ignore case
    const pattern = new RegExp([search], 'gi')
    
    // return all user objects that match search in field passed in as arg
    return products.filter(product => Object.values(product).toString().search(pattern) !== -1);
  }

  const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: "dodgerblue",
      color: theme.palette.common.white,
      fontSize: 18
    },
    body: {
      fontSize: 18,
      backgroundColor: "white"
    }
  }))(TableCell);

class AdminProductListing extends Component {
    
    constructor() {
        super();
        this.state = {
            search: '',
            products: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShowAllProducts = this.handleShowAllProducts.bind(this);
    }

    componentDidMount() {
        const { products } = this.props;

        this.setState({ products })
    }

    handleChange(event) {
        this.setState({ search: event.target.value })
    }

    handleSubmit(event) {
        const { products } = this.props;
        const { search } = this.state;

        event.preventDefault();
        this.setState({ products: searchProducts(products, search) })
    }

    // toggle to show all products again
    handleShowAllProducts() {
        this.setState({
            products: this.props.products
        })
    }

    render() {
        const { handleChange, handleSubmit, handleShowAllProducts } = this;
        const { products } = this.state;

    return (
        
        <Fragment>

            <Typography
                variant="h2"
                gutterBottom
                style={{ color: 'dodgerblue' }}
            >
                Grace Shopper Products
            </Typography>


            <form onSubmit={ handleSubmit }>

                <Grid container alignItems="center" alignContent="flex-start" spacing={16}>

                    <Grid item>
                        <TextField
                            name="search"
                            placeholder="search..."
                            margin="normal"
                            variant="filled"
                            onChange={ handleChange }
                            style={{ width: "300px" }}
                        />
                    </Grid>

                    <Grid item>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary" 
                        >
                            Search
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button
                            type="button"
                            variant="contained"
                            color="secondary"
                            onClick={ () => handleShowAllProducts() }
                        >
                            Show All
                        </Button>
                    </Grid>

                    </Grid>

            </form>   
            

            <br />
            <br />

            <Table>

                <TableHead>
                    <TableRow>
                        <CustomTableCell>Title</CustomTableCell>
                        <CustomTableCell style={{ textAlign: 'center' }}>Author</CustomTableCell>
                        <CustomTableCell style={{ textAlign: 'center' }}>Inventory</CustomTableCell>
                        <CustomTableCell style={{ textAlign: 'center' }}>Price</CustomTableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {
                        products.map(product => {
                            return (

                                <TableRow key={ product.id }>

                                    <CustomTableCell component="th" scope="row">
                                        <Link
                                            to={`/admins/products/${product.id}`}
                                            style={ {textDecoration: 'none'} }>
                                            { product.title }
                                        </Link>
                                    </CustomTableCell>

                                    <CustomTableCell
                                        style={{ textAlign: 'center' }}
                                        component="th"
                                        scope="row"
                                    >
                                        { product.author }
                                    </CustomTableCell>
                                    
                                    <CustomTableCell
                                        style={{ textAlign: 'center' }}
                                        component="th"
                                        scope="row"
                                    >
                                        { product.inventory }
                                    </CustomTableCell>

                                    <CustomTableCell
                                        style={{ textAlign: 'center' }}
                                        component="th"
                                        scope="row"
                                    >
                                        { product.price }
                                    </CustomTableCell>
                                
                                </TableRow>
                            )
                        })
                    }
                </TableBody>

            </Table>

        </Fragment>
    )
}
}

const mapStateToProps = ({ products }) => {

    return {
        products
    };
};

export default connect(mapStateToProps)(AdminProductListing);
