import React, { Component } from 'react'
import { Grid , List, ListItem, ListItemText} from '@material-ui/core'
import Products from './Product/Products';
import { connect } from 'react-redux';
import { getCategories, getRecommendedProducts } from './../utils';
import { getProducts } from './../store';
import { Link } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: 'All',
        };
        this.setCategory = this.setCategory.bind(this);
    }

    setCategory(category) {
        this.setState({ category });
    }

  componentDidMount(){
    this.props.getProducts()
  }

  render() {
    const { products, recommendedProducts } = this.props
    const categories = getCategories(products);
    const { setCategory } = this;
    const { category } = this.state;
        return (
            <Grid container spacing={24}>
                <Grid item sm={2} style={style.GridItem}>
                    <ul>
                    {
                        categories.map((categoryName, index) => 
                            <ListItem 
                                key={index}
                                button component={Link}
                                to={`/${categoryName}/products/page/0`} 
                                onClick={() => setCategory(categoryName)}
                                selected={categoryName === category}>
                                <ListItemText primary={categoryName} />
                            </ListItem>
                        )
                    }
                    </ul>
                </Grid>
                <Grid item sm style={style.GridItem}> 
                    <Products category={'Products with highest reviews'} products={recommendedProducts}/>
                </Grid>
            </Grid>
        )
    }
}

const style = {
  GridItem: { padding: 10, marginTop: 10, height: '90vh' },
};

const mapStateToProps = ({products, reviews}) => {
    return {
        products,
        recommendedProducts: getRecommendedProducts(reviews, products)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: () => dispatch(getProducts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
