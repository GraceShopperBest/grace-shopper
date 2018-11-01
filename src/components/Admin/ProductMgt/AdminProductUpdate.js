import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';

import { updateProduct, deleteProduct } from '../../../reducers/products';
import { getProductById } from '../../../utils';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';


class AdminProductUpdate extends Component {

  constructor() {
    super();
    this.state = {
      product: {
        title: '',
        description: '',
        primaryImageUrl: '',
        images: '',
        price: '',
        inventory: '',
        categories: ''
      },
      success: '',
      error: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { product } = this.props;

    // converts incoming category array to string of categories
    const categories = product.categories.join(', ');

    // preloads state with product data (including formatted category field)
    this.setState({ product: { ...product, categories } })
  }

  handleChange(event) {
    const product = Object.assign({}, this.state.product, { [event.target.name]: event.target.value })
    this.setState({ product })
  }

  handleSubmit(event) {
    const { onUpdateProduct } = this.props;
    const { product } = this.state;

    event.preventDefault();
    onUpdateProduct(product)
      .then(() => {
        this.setState({ success: 'Product updated successfully!' })
      })
      .catch(error => this.setState({ error: 'An error has occurred.' }));
  }

  handleDelete(product) {
    const { onDeleteProduct} = this.props;

    onDeleteProduct(product)
  }

  render() {
    const { handleChange, handleSubmit, handleDelete } = this;
    const { success, error } = this.state;
    const { title, description, primaryImageUrl, price, inventory, categories } = this.state.product;

    return (
      <Fragment>

        <Typography
          variant="h2"
          gutterBottom
          style={{ color: 'dodgerblue' }}
        >
          Update Product
        </Typography>

        <Typography
          variant="subtitle1"
          style={{ color: 'green', marginLeft: "25px" }}
          gutterBottom>
            { success }
          </Typography>
        
        <Typography
          variant="subtitle1"
          style={{ color: 'red', marginLeft: "25px" }}
          gutterBottom>
            { error }
        </Typography>

        <br />
        <br />

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
                label="primary image (URL only)"
                margin="normal"
                variant="outlined"
                onChange={ handleChange }
                value={ primaryImageUrl }
                style={{ width: "700px" }}
              />
            </Grid>

            {/* <Grid item>
              <TextField
                required
                type="url"
                name="image1"
                label="image-1 (URL only)"
                margin="normal"
                variant="outlined"
                onChange={ handleChange }
                value={ image1 }
                style={{ width: "700px" }}
              />
            </Grid>

            <Grid item>
              <TextField
                required
                type="url"
                name="image2"
                label="image-2 (URL only)"
                margin="normal"
                variant="outlined"
                onChange={ handleChange }
                value={ image2 }
                style={{ width: "700px" }}
              />
            </Grid> */}

            <img src={ primaryImageUrl } style={{ marginLeft: "25px" }}/>
            {/* <img src={ image1 } style={{ width: '25%', marginLeft: "25px" }}/>
            <img src={ image2 } style={{ width: '25%', marginLeft: "25px" }}/> */}

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
                min="0.01"
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
                min="0"
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
              required
              name="categories"
              label="categories (separated by comma + space)"
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
            style={{ width: '100px' }}
        >
          Submit
        </Button>

        <Button
            type="button"
            variant="contained"
            color="secondary"
            style={{ width: '100px', marginLeft: "10px" }}
            onClick={ () => handleDelete(this.state.product) }
        >
          Delete
          <DeleteIcon />
        </Button>

        <br />
        <br />

        </form>

      </Fragment>
    )
  }


}

const mapStateToProps = ({ products }, { match }) => {
  const id = +match.params.id;
  const product = getProductById(products, id);

  return {
    product
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  console.log(history)

  return {
    onUpdateProduct: (product) => dispatch(updateProduct(product)),
    onDeleteProduct: (product) => dispatch(deleteProduct(product, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductUpdate);

