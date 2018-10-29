import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProductCard from './ProductCard';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 1.5,
    textAlign: 'left',
    backgroundColor: '#EEEEEE',
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit
  }
});

const Products = ({ products, category, classes }) => {
    if(!products){
        return null;
    }
    return (
        <div className='productsContainer'>
            <div style={{ gridColumnEnd: 'span 12' }}>
                <Paper className={classes.paper} elevation={1} >
                    <Typography variant="h5" component="h3">
                    Category: {category}
                    </Typography>
                </Paper>
            </div>
            <Grid container spacing={24}>
                {
                    products.map(product => {
                        return (
                            <Grid key={product.id} item xs={9} sm={6}>
                                <ProductCard className='productCard' product={product}/>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    );
}

Products.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Products);
