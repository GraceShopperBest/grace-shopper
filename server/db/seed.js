const faker = require('faker');

const createUsers = () => {
    const users = [];
    let i = 0;
    while (i < 50) {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        if(!users.find(user => user.userName === firstName)) {
            users.push({
                firstName,
                lastName, 
                userName: firstName, 
                password: lastName,  
                email: `${firstName}.${lastName}@email.com`
            });
            i++;
        }
    }

    users.push({ firstName: "Grace", lastName: "Shopper", userName: "shopper", 
        password: "admin", email: "admin@email.com", isAdmin: true})
    return users;
}

const createProducts = () => {

    const getCategory = (index) => {
        const categories = [];
        if(index % 5 === 0) categories.push("Science Fiction")
        if(index % 10 === 0) categories.push("Mystery")
        if(index % 3 === 0) categories.push("Thriller")
        if(!categories.length) categories.push("Drama")
        return categories;
    }

    const products = [];
    let i = 0;
    while (i < 100) {
        const title = faker.lorem.words();
        if(!products.find(product => product.title === title)) {
            products.push({
                title,
                description: faker.lorem.paragraph(),
                price: faker.commerce.price(),
                inventory: faker.random.number({ min: 1, max: 10000}),
                imageUrl: `https://picsum.photos/200/300/?image=${i}`,
                categories: getCategory(i)
            });
            i++;
        }
    }
    return products;
}

module.exports = {
    createUsers,
    createProducts
}