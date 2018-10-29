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
                primaryImageUrl: `https://picsum.photos/400/500/?image=${i}`,
                images: [
                    `https://picsum.photos/400/500/?image=${i+100}`,
                    `https://picsum.photos/400/500/?image=${i+101}`,
                    `https://picsum.photos/400/500/?image=${i+102}`,
                ],
                categories: getCategory(i)
            });
            i++;
        }
    }
    return products;
}

const createOrdersWithLineItems = () => {
    const orders = [];  
    orders.push(
        { userId: 1, type: "ORDER", status: "COMPLETED", lineItems: [
            { productId: 3, quantity: 2, price: 25},
            { productId: 4, quantity: 1, price: 90}
        ]},
        { userId: 1, type: "ORDER", status: "CREATED", lineItems: [
            { productId: 1, quantity: 50, price: 10},
            { productId: 2, quantity: 5, price: 20}
        ]},
        { userId: 2, type: "ORDER", status: "CANCELLED", lineItems: [
            { productId: 3, quantity: 2, price: 35},
            { productId: 4, quantity: 1, price: 150}
        ]},
        { userId: 2, type: "ORDER", status: "PROCESSING", lineItems: [
            { productId: 1, quantity: 50, price: 10},
            { productId: 2, quantity: 5, price: 20}
        ]}     
    )
    return orders;
}

module.exports = {
    createUsers,
    createProducts,
    createOrdersWithLineItems
}