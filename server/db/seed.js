const faker = require('faker');

const NO_OF_USERS = 50;
const NO_OF_PRODUCTS = 100;
const NO_OF_REVIEWS_PER_PRODUCT = 3;

const createUsers = () => {
  const users = [];
  let i = 0;
  while (i < NO_OF_USERS) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const address = faker.address;
    if (!users.find(user => user.userName === firstName)) {
      users.push({
        firstName,
        lastName,
        userName: firstName,
        password: lastName,
        email: `${firstName}.${lastName}@email.com`,
        address: `${address.streetAddress()}, ${address.city()}, ${address.state()}, ${address.zipCode()}`,
      });
      i++;
    }
  }

  users.push({
    firstName: 'Grace',
    lastName: 'Shopper',
    userName: 'shopper',
    password: 'admin',
    email: 'admin@email.com',
    address: '123 Main Street',
    isAdmin: true,
  });
  return users;
};

const createProducts = () => {
  const getCategory = index => {
    const categories = [];
    if (index % 5 === 0) categories.push('Science Fiction');
    if (index % 10 === 0) categories.push('Mystery');
    if (index % 3 === 0) categories.push('Thriller');
    if (!categories.length) categories.push('Drama');
    return categories;
  };

  const products = [];
  let i = 0;
  while (i < NO_OF_PRODUCTS) {
    const title = faker.lorem.words();
    const price = faker.commerce.price();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    if (!products.find(product => product.title === title) && price > 0.01) {
      products.push({
        title,
        author: `${firstName} ${lastName}`,
        description: faker.lorem.paragraph(),
        price,
        inventory: faker.random.number({ min: 1, max: 10000 }),
        primaryImageUrl: `https://picsum.photos/400/500/?image=${i}`,
        images: [
          `https://picsum.photos/400/500/?image=${i + NO_OF_PRODUCTS}`,
          `https://picsum.photos/400/500/?image=${i + NO_OF_PRODUCTS + 1}`,
          `https://picsum.photos/400/500/?image=${i + NO_OF_PRODUCTS + 2}`,
        ],
        categories: getCategory(i),
      });
      i++;
    }
  }
  return products;
};

const createOrdersWithLineItems = () => {
  const orders = [];
  orders.push(
    {
      userId: 1,
      type: 'ORDER',
      status: 'COMPLETED',
      lineItems: [
        { productId: 3, quantity: 2, price: 25 },
        { productId: 4, quantity: 1, price: 90 },
      ],
    },
    {
      userId: 1,
      type: 'ORDER',
      status: 'CREATED',
      lineItems: [
        { productId: 1, quantity: 50, price: 10 },
        { productId: 2, quantity: 5, price: 20 },
      ],
    },
    {
      userId: 2,
      type: 'ORDER',
      status: 'CANCELLED',
      lineItems: [
        { productId: 3, quantity: 2, price: 35 },
        { productId: 4, quantity: 1, price: 150 },
      ],
    },
    {
      userId: 2,
      type: 'ORDER',
      status: 'PROCESSING',
      lineItems: [
        { productId: 1, quantity: 50, price: 10 },
        { productId: 2, quantity: 5, price: 20 },
      ],
    }
  );
  return orders;
};

const createReviews = () => {
  const reviews = [];
  let i = 1;
  while (i < NO_OF_PRODUCTS) {
    for (let j = 0; j < NO_OF_REVIEWS_PER_PRODUCT; j++) {
      const text = faker.lorem.paragraph();
      const rating = faker.random.number({ min: 1, max: 5 });
      const userId = faker.random.number({ min: 1, max: NO_OF_USERS - 1 });
      reviews.push({ text, rating, productId: i, userId });
    }
    i++;
  }
  return reviews;
};

module.exports = {
  createUsers,
  createProducts,
  createOrdersWithLineItems,
  createReviews,
};
