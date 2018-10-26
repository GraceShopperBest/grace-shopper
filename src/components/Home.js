import React, { Component } from 'react'
import { Grid , List, ListItem, ListItemText} from '@material-ui/core'

// TO DO: Need to be a connected component to get the categories list. For now, hard-coding test data
class Home extends Component {

    constructor() {
        super()
        this.state = {
            category: 'All'
        }
        this.setCategory = this.setCategory.bind(this)
    }

    setCategory(category) {
        this.setState({category})
    }

    render () {
        const categories = getCategories()
        const { setCategory } = this
        const { category } = this.state

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
                    Display Products belonging to Category {category}
                </Grid>
            </Grid>
        )
    }
}

const style = {
    GridItem: { padding: 10, marginTop: 10, height: "90vh" }
}

export default Home

//This will eventually be deleted once connected to Store
const getCategories = () => {
    const products = fakeProducts();
    return products.reduce((result, product) => {
        product.categories.forEach(category => {
            if(!result.includes(category)) {
                result.push(category)
            }
        });
        return result;
    }, ["All"]);
}

const fakeProducts = () => {
    return [{
        id: 3,
        title: "sed quod eos",
        description: "Aut ut quibusdam et aliquam et. Aliquam molestiae ipsa nesciunt minima a et suscipit cum vitae. Placeat est quaerat natus sunt quam in. Ducimus laborum ipsa. Dolores est nostrum placeat est doloremque aut distinctio minus. Asperiores velit vero neque ab a et est nihil.",
        price: "122.00",
        inventory: 7061,
        imageUrl: "https://picsum.photos/200/300/?image=2",
        categories: [
        "Drama"
        ],
        createdAt: "2018-10-26T16:04:09.655Z",
        updatedAt: "2018-10-26T16:04:09.655Z"
        },
        {
        id: 6,
        title: "vero voluptas recusandae",
        description: "Provident est provident omnis laborum rerum nesciunt fugit labore. Nisi enim eum est rerum quia eos est. Corrupti alias natus. Quaerat officiis fuga labore commodi blanditiis nihil possimus dicta porro.",
        price: "515.00",
        inventory: 3978,
        imageUrl: "https://picsum.photos/200/300/?image=5",
        categories: [
        "Science Fiction"
        ],
        createdAt: "2018-10-26T16:04:09.656Z",
        updatedAt: "2018-10-26T16:04:09.656Z"
        },
        {
        id: 7,
        title: "error qui rem",
        description: "Laborum illum labore iure nisi est qui consectetur et omnis. Eum nulla facilis. Vitae iusto quis. Quasi excepturi ut. Ut et quo deleniti rerum commodi ad.",
        price: "474.00",
        inventory: 5545,
        imageUrl: "https://picsum.photos/200/300/?image=6",
        categories: [
        "Thriller"
        ],
        createdAt: "2018-10-26T16:04:09.656Z",
        updatedAt: "2018-10-26T16:04:09.656Z"
        },
    ]
}