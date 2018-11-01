import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';

import { addProduct } from '../../../reducers/products';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class AdminProductCreate extends Component {

  constructor() {
    super();
    this.state = {
      product: {
        title: '',
        description: '',
        primaryImageUrl: '',
        price: '',
        inventory: '',
        categories: ''
      },
      status: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const product = Object.assign({}, this.state.product, { [event.target.name]: event.target.value })
    this.setState({ product })
  }

  handleSubmit(event) {
    const { onAddProduct } = this.props;
    const { product } = this.state;

    event.preventDefault();
    onAddProduct(product);
  }

  render() {
    const { handleChange, handleSubmit } = this;
    const { products } = this.props;
    const { title, description, primaryImageUrl, price, inventory, categories } = this.state.product;

    return (
      <Fragment>

        <Typography
          variant="h2"
          gutterBottom
          style={{ color: 'dodgerblue' }}
        >
          Create Product
        </Typography>

        <form onSubmit={ handleSubmit }>

        <Paper elevation={5} style={{backgroundColor: '#FFFFFF', padding: '10px' }}>

          <Grid
            container
            justify="flex-start"
            spacing={16}
            style={{ marginLeft: "20px", width: "700px" }}
          >

            <Grid item>
              <TextField
                required
                type="url"
                name="primaryImageUrl"
                label="primary photo (URL only)"
                margin="normal"
                variant="outlined"
                onChange={ handleChange }
                value={ primaryImageUrl }
                style={{ width: "700px" }}
              />
            </Grid>

            <img src={ primaryImageUrl } style={{ marginLeft: "50px" }}/>

            <br />

            <Grid item>
              <TextField
                required
                name="title"
                label="title"
                margin="normal"
                variant="outlined"
                onChange={ handleChange }
                value={ title }
                style={{ width: "700px" }}
              />
            </Grid>

            {/* <Grid item>
              <TextField
                name="author"
                label="author"
                margin="normal"
                variant="outlined"
                onChange={ handleChange }
                value={ author }
                style={{ width: "700px" }}
              />
            </Grid> */}

            <Grid item>
              <TextField
                id="filled-multiline-static"
                required
                multiline
                rows="5"
                name="description"
                label="description"
                margin="normal"
                variant="outlined"
                onChange={ handleChange }
                value={ description }
                style={{ width: "700px" }}
              />
            </Grid>

          </Grid>

        </Paper>

        <br />
        <br />

        <Paper elevation={5} style={{backgroundColor: '#FFFFFF', padding: '10px' }}>

          <Grid
            container
            justify="flex-start"
            spacing={16}
            style={{ marginLeft: "20px", width: "700px" }}
          >

            <Grid item>
              <TextField
                required
                type="number"
                step="0.01"
                name="price"
                placeholder="$0.00"
                min="0.00"
                label="price"
                margin="normal"
                variant="outlined"
                onChange={ handleChange }
                value={ price }
                style={{ width: "200px" }}
              />
            </Grid>

            <Grid item>
              <TextField
                required
                name="inventory"
                type="number"
                step="1"
                placeholder="0"
                label="inventory"
                margin="normal"
                variant="outlined"
                onChange={ handleChange }
                value={ inventory }
                style={{ width: "200px" }}
              />
            </Grid>

          </Grid>

        </Paper>

        <br />
        <br />

        <Paper elevation={5} style={{backgroundColor: '#FFFFFF', padding: '10px' }}>

          <Grid
            container
            justify="flex-start"
            spacing={16}
            style={{ marginLeft: "20px", width: "700px" }}
          >

            <Grid item>
              <TextField
                // required
                name="categories"
                label="categories (separate by ,)"
                margin="normal"
                variant="outlined"
                onChange={ handleChange }
                value={ categories }
                style={{ width: "700px" }}
              />
            </Grid>

          </Grid>

        </Paper>

        <br />
        <br />

        <Button
            type="submit"
            variant="contained"
            color="primary" 
        >
          Submit
        </Button>

        </form>

      </Fragment>
    )
  }


}

const mapStateToProps = ({ products }) => {
  return {
    products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddProduct: (product) => dispatch(addProduct(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductCreate);
