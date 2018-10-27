import React, { Component } from 'react'
import { Grid , List, ListItem, ListItemText} from '@material-ui/core'
import Products from './Products';
import { connect } from 'react-redux';
import { getCategories, getProductByCategory } from './../store';

// TO DO: Need to be a connected component to get the categories list. For now, hard-coding test data
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

  render() {
    const { products } = this.props
    const { setCategory } = this;
    const { category } = this.state;
    const categories = getCategories(products);
        return (
            <Grid container spacing={24}>
                <Grid item sm={2} style={style.GridItem}>
                    <List>
                    {
                        categories.map((categoryName, index) => 
                            <ListItem key={index} button onClick={() => setCategory(categoryName)}
                                    selected={categoryName === category}>
                                <ListItemText primary={categoryName} />
                            </ListItem>
                        )
                    }
                    </List>
                </Grid>
                <Grid item sm style={style.GridItem}> 
                    <Products category={category} products={getProductByCategory(category, products)}/>
                </Grid>
            </Grid>
        )
    }
}

const style = {
  GridItem: { padding: 10, marginTop: 10, height: '90vh' },
};

const mapStateToProps = ({products}) => {
    return {
        products
    }
}

export default connect(mapStateToProps)(Home);
