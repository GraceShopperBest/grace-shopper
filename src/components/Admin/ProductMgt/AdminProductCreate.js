import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { addProduct } from '../../../reducers/products';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// NOTE: the success message remain on page, but all other fields cleared
// on error, the error message will appear and all fields intact
const initialState = {
  product: {
    title: '',
    description: '',
    author: '',
    primaryImageUrl: '',
    images: '',
    price: '',
    inventory: '',
    categories: '',
  },
  tempImages: {
    image1: '',
    image2: '',
    image3: '',
  },
  error: '',
};

class AdminProductCreate extends Component {
  constructor() {
    super();
    this.state = {
      product: {
        title: '',
        description: '',
        author: '',
        primaryImageUrl: '',
        images: '',
        price: '',
        inventory: '',
        categories: '',
      },
      tempImages: {
        image1: '',
        image2: '',
        image3: '',
      },
      success: '',
      error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleImages = this.handleImages.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { primaryImageUrl } = this.state.product;
    const { image1, image2, image3 } = this.state.tempImages;

    const product = Object.assign({}, this.state.product, {
      [event.target.name]: event.target.value,
    });
    product.images = `${image1}, ${image2}, ${image3}`;
    this.setState({ product });
  }

  handleSubmit(event) {
    const { onAddProduct } = this.props;
    const { product } = this.state;

    event.preventDefault();
    onAddProduct(product).then(() => {
      this.setState({ success: 'Product added successfully!' });
      this.setState(initialState);
    })
    .catch(error => this.setState({ error: 'An error has occurred.', success: '' }));
  }

  handleImages() {
    const image1 = document.getElementById('image1').value;
    const image2 = document.getElementById('image2').value;
    const image3 = document.getElementById('image3').value;
    const tempImages = { image1, image2, image3 };

    this.setState({ tempImages });
  }

  render() {
    const { handleChange, handleSubmit, handleImages } = this;
    const { success, error } = this.state;
    const { image1, image2, image3 } = this.state.tempImages;
    const {
      title,
      description,
      author,
      primaryImageUrl,
      price,
      inventory,
      categories,
    } = this.state.product;

    return (
      <Fragment>
        <Typography variant="h2" gutterBottom style={{ color: 'dodgerblue' }}>
          Create Product
        </Typography>

        <Typography
          variant="subtitle1"
          style={{ color: 'green', marginLeft: '25px' }}
          gutterBottom
        >
          {success}
        </Typography>

        <Typography
          variant="subtitle1"
          style={{ color: 'red', marginLeft: '25px' }}
          gutterBottom
        >
          {error}
        </Typography>

        <br />
        <br />

        <form onSubmit={handleSubmit}>
          <Paper
            elevation={5}
            style={{
              backgroundColor: '#FFFFFF',
              padding: '10px',
              width: '900px',
            }}
          >
            <Grid
              container
              justify="flex-start"
              spacing={16}
              style={{ marginLeft: '20px', width: '900px' }}
            >
              <Grid item>
                <TextField
                  required
                  type="url"
                  name="primaryImageUrl"
                  label="primary photo (URL only)"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={primaryImageUrl}
                  style={{ width: '700px' }}
                />
              </Grid>

              <Grid item>
                <TextField
                  type="url"
                  id="image1"
                  name="image1"
                  label="image-1 (URL only)"
                  margin="normal"
                  variant="outlined"
                  onChange={handleImages}
                  value={image1}
                  style={{ width: '700px' }}
                />
              </Grid>

              <Grid item>
                <TextField
                  type="url"
                  id="image2"
                  name="image2"
                  label="image-2 (URL only)"
                  margin="normal"
                  variant="outlined"
                  onChange={handleImages}
                  value={image2}
                  style={{ width: '700px' }}
                />
              </Grid>

              <Grid item>
                <TextField
                  type="url"
                  id="image3"
                  name="image3"
                  label="image-3 (URL only)"
                  margin="normal"
                  variant="outlined"
                  onChange={handleImages}
                  value={image3}
                  style={{ width: '700px' }}
                />
              </Grid>

              <img
                src={primaryImageUrl ? primaryImageUrl : null}
                style={{
                    width: "25%",
                    height: "25%",
                    marginLeft: "10px",
                    border: primaryImageUrl ? "2px solid red" : 'none'
                }}
              />

              <img
                src={ image1 ? image1 : null }
                style={{
                    width: "25%",
                    height: "25%",
                    marginLeft: "10px"
                }}
              />

              <img
                src={ image2 ? image2 : null }
                style={{
                  width: "25%",
                  height: "25%",
                  marginLeft: "10px"
                }}
              />

              <img
                src={ image3 ? image3 : null }
                style={{
                    width: "25%",
                    height: "25%",
                    marginLeft: "10px"
                }}
              />

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

            <Grid item>
              <TextField
                required
                name="author"
                label="author"
                margin="normal"
                variant="outlined"
                onChange={ handleChange }
                value={ author }
                style={{ width: "700px" }}
              />
            </Grid>

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
                  onChange={handleChange}
                  value={description}
                  style={{ width: '700px' }}
                />
              </Grid>
            </Grid>
          </Paper>

          <br />
          <br />

          <Paper
            elevation={5}
            style={{
              backgroundColor: '#FFFFFF',
              padding: '10px',
              width: '900px',
            }}
          >
            <Grid
              container
              justify="flex-start"
              spacing={16}
              style={{ marginLeft: '20px', width: '700px' }}
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
                  onChange={handleChange}
                  value={price}
                  style={{ width: '200px' }}
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
                  onChange={handleChange}
                  value={inventory}
                  style={{ width: '200px' }}
                />
              </Grid>
            </Grid>
          </Paper>

          <br />
          <br />

          <Paper
            elevation={5}
            style={{
              backgroundColor: '#FFFFFF',
              padding: '10px',
              width: '900px',
            }}
          >
            <Grid
              container
              justify="flex-start"
              spacing={16}
              style={{ marginLeft: '20px', width: '700px' }}
            >
              <Grid item>
                <TextField
                  required
                  name="categories"
                  label="categories (separated by comma + space)"
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  value={categories}
                  style={{ width: '700px' }}
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

          <br />
          <br />
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ products }) => {
  return {
    products,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddProduct: product => dispatch(addProduct(product)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminProductCreate);
