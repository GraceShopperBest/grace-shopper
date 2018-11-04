import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPagedProducts, getProductCountByCategory, getProductCount } from './../../store';
import { getPageNum, generatePager } from './../../utils';
import Products from './Products';
import Paginator from './../Paginator';
import { Grid , List, ListItem, ListItemText} from '@material-ui/core'
import { Link } from 'react-router-dom'

class PagedProducts extends Component {
    constructor(props){
        super(props);
        this.state = {
            category: this.props.category ? this.props.category : ''
        }
        this.setCategory = this.setCategory.bind(this);
    }

    setCategory = (category) => {
        if(window.sessionStorage.getItem('currCat') !== category){
            window.sessionStorage.setItem('currCat', category)
            this.setState({ category });
            category === "All" ? this.props.getProductCount() : this.props.getProductCountByCategory(category)
            this.props.getPagedProducts(this.props.index, category)
        }
    }

    componentDidMount(){
        const { index, category} = this.props;
        category === "All" ? this.props.getProductCount() : this.props.getProductCountByCategory(category)
        this.props.getPagedProducts(index, category)
    }

    componentWillUnmount() {
        window.sessionStorage.clear();
      }

    componentDidUpdate(prevProps){
        if(prevProps.index !== this.props.index){
            this.props.getPagedProducts(this.props.index, this.props.category)
        }
    }

    render() {
        const { index, products, productCount, totalPages } = this.props
        const { category } = this.state
        const { setCategory } = this;
        const pageLimit = 10;
        let pageNum;
        if(productCount !== 0 && productCount.count.count > pageLimit){
            pageNum = totalPages(productCount.count.count, pageLimit)
        }
        if(!products){
            return null;
        }
        const categories = window.localStorage.getItem('categoriesList').split(',')
        return (
            <Grid container spacing={24}>
                <Grid item sm={2} style={style.GridItem}>
                    <List>
                    {
                        Object.keys(categories).map((key, index) => 
                            <ListItem 
                                key={index}
                                button component={Link}
                                to={`/${categories[key]}/products/page/0`} 
                                onClick={() => setCategory(categories[key])}
                                selected={categories[key] === category}>
                                <ListItemText primary={categories[key]} />
                            </ListItem>
                        )
                    }
                    </List>
                </Grid>
                <Grid item sm style={style.GridItem}> 
                <Products category={category} products={products}/>
                {productCount !== 0 && productCount.count.count > pageLimit && 
                    <Paginator count={pageNum} page={index} category={category}/>
                }
                </Grid>
            </Grid>
            
        );
    }
}

const style = {
    GridItem: { padding: 10, marginTop: 10, height: '90vh' },
  };

const mapStateToProps = ({products, productCount}, {match}) => {
    const index = match.params.index*1;
    const category = match.params.categories;
    return {
        category,
        totalPages: (productsCount, pageLimit) => getPageNum(productsCount, pageLimit),
        index,
        products,
        productCount,
        generatePager: (pageNum, index) => generatePager(pageNum, index)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPagedProducts: (index, category) => dispatch(getPagedProducts(index, category)),
        getProductCountByCategory: (category) => dispatch(getProductCountByCategory(category)),
        getProductCount: () => dispatch(getProductCount())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PagedProducts);