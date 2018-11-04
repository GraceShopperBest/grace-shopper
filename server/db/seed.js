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

const createProducts =  () => {
  const getCategory = index => {
    const categories = [];
    if (index % 5 === 0) categories.push('Fiction');
    if (index % 10 === 0) categories.push('Political Science');
    if (index % 3 === 0) categories.push('Thriller');
    if (!categories.length) categories.push('Travel');
    return categories;
  };

  const products = getBestSellers();
  let i = products.length + 1;
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
}

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

const getBestSellers = () => {
  return [
    {
    title: "--and the Horse He Rode in on",
    author: "James Carville",
    description: "Offers a critique of Independent Prosecutor Kenneth Starr and his investigation of President Clinton",
    price: "807.00",
    inventory: 9533,
    primaryImageUrl: "http://books.google.com/books/content?id=AGCYG_-83EAC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    images: [
    "https://picsum.photos/400/500/?image=100",
    "https://picsum.photos/400/500/?image=101",
    "https://picsum.photos/400/500/?image=102"
    ],
    categories: [
    "Political Science"
    ],
    createdAt: "2018-11-03T18:36:26.071Z",
    updatedAt: "2018-11-03T18:36:26.071Z"
    },
    {
    title: `I Give You My Body . . .`,
    author: "Diana Gabaldon",
    description: "NEW YORK TIMES BESTSELLER • For writers looking to make sure their next physical interlude on the page inspires readers to share the moment rather than to laugh at it, bestselling author Diana Gabaldon divulges the writing secrets behind the sex scenes in her wildly popular Outlander novels. “Ask me to your bed,” he said. “I shall come to ye.” In this revealing compendium, acclaimed writer Diana Gabaldon shares her invaluable lessons for creating an immersive reading experience, from evoking a mood to using the power of emotions to communicate physical intimacy. You’ll learn the difference between gratuitous sex and genuine encounters that move the story forward, and how to handle less-than-savory acts that nevertheless serve a narrative purpose. Gabaldon also notes that sex can be conveyed instead of described. With such tips as “The Rule of Three” for involving the senses, handy lists of naughty euphemisms (with instructions for use), and Gabaldon’s own examples from the Outlander novels, “I Give You My Body . . .” is a master class in writing to draw readers in and keep them riveted to the page.",
    price: "621.00",
    inventory: 4363,
    primaryImageUrl: "http://books.google.com/books/content?id=B81wDAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    images: [
    "https://picsum.photos/400/500/?image=101",
    "https://picsum.photos/400/500/?image=102",
    "https://picsum.photos/400/500/?image=103"
    ],
    categories: [
    "Language Arts & Disciplines"
    ],
    createdAt: "2018-11-03T18:36:26.071Z",
    updatedAt: "2018-11-03T18:36:26.071Z"
    },
    {
    title: "#Girlboss",
    author: "Sophia Amoruso",
    description: "The founder of the Nasty Gal fashion e-tailer shares an irreverent manifesto for ambitious young women that explains how to channel personal passion and energy while overcoming insecurities, outlining straightforward advice on doing meaningful work and garnering recognition.",
    price: "538.00",
    inventory: 8252,
    primaryImageUrl: "http://books.google.com/books/content?id=B__YCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    images: [
    "https://picsum.photos/400/500/?image=103",
    "https://picsum.photos/400/500/?image=104",
    "https://picsum.photos/400/500/?image=105"
    ],
    categories: [
    "Business & Economics"
    ],
    createdAt: "2018-11-03T18:36:26.071Z",
    updatedAt: "2018-11-03T18:36:26.071Z"
    },
    {
    title: "1,000 Places to See Before You Die",
    author: "Patricia Schultz",
    description: "The world’s bestselling travel book is back in a more informative, more experiential, more budget-friendly full-color edition. A #1 New York Times bestseller, 1,000 Places reinvented the idea of travel book as both wish list and practical guide. As Newsweek wrote, it “tells you what’s beautiful, what’s fun, and what’s just unforgettable— everywhere on earth.” And now the best is better. There are 600 full-color photographs. Over 200 entirely new entries, including visits to 28 countries like Lebanon, Croatia, Estonia, and Nicaragua, that were not in the original edition. There is an emphasis on experiences: an entry covers not just Positano or Ravello, but the full 30-mile stretch along the Amalfi Coast. Every entry from the original edition has been readdressed, rewritten, and made fuller, with more suggestions for places to stay, restaurants to visit, festivals to check out. And throughout, the book is more budget-conscious, starred restaurants and historic hotels such as the Ritz, but also moderately priced gems that don’t compromise on atmosphere or charm. The world is calling. Time to answer.",
    price: "669.00",
    inventory: 9690,
    primaryImageUrl: "http://books.google.com/books/content?id=AWNSZWBIIzIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    images: [
    "https://picsum.photos/400/500/?image=102",
    "https://picsum.photos/400/500/?image=103",
    "https://picsum.photos/400/500/?image=104"
    ],
    categories: [
    "Travel"
    ],
    createdAt: "2018-11-03T18:36:26.071Z",
    updatedAt: "2018-11-03T18:36:26.071Z"
    },
    {
    title: "#AskGaryVee",
    author: "Gary Vaynerchuk",
    description: "The New York Times bestselling author draws from his popular show #AskGaryVee to offer surprising, often outrageous, and imminently useful and honest answers to everything you’ve ever wanted to know—and more—about navigating the new world. Gary Vaynerchuk—the inspiring and unconventional entrepreneur who introduced us to the concept of crush it—knows how to get things done, have fun, and be massively successful. A marketing and business genius, Gary had the foresight to go beyond traditional methods and use social media tools such as Twitter, Facebook, and YouTube to reach an untapped audience that continues to grow. #AskGaryVee showcases the most useful and interesting questions Gary has addressed on his popular show. Distilling and expanding on the podcast’s most urgent and evergreen themes, Gary presents practical, timely, and timeless advice on marketing, social media, entrepreneurship, and everything else you’ve been afraid to ask but are dying to know. Gary gives you the insights and information you need on everything from effectively using Twitter to launching a small business, hiring superstars to creating a personal brand, launching products effectively to staying healthy—and even buying wine. Whether you’re planning to start your own company, working in digital media, or have landed your first job in a traditional company, #AskGaryVee is your essential guide to making things happen in a big way.",
    price: "99.00",
    inventory: 5321,
    primaryImageUrl: "http://books.google.com/books/content?id=xz3nsgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    images: [
    "https://picsum.photos/400/500/?image=104",
    "https://picsum.photos/400/500/?image=105",
    "https://picsum.photos/400/500/?image=106"
    ],
    categories: [
    "Business & Economics"
    ],
    createdAt: "2018-11-03T18:36:26.071Z",
    updatedAt: "2018-11-03T18:36:26.071Z"
    },
    {
    title: "1 Ragged Ridge Road",
    author: "Leonard Foglia",
    description: "Estranged from her husband, Carol Robbins and her young son transform a mansion into the Christmas Inn bed and breakfast, before learning of the bizarre, unsolved double murder of the mansion's former owners. A first novel.",
    price: "889.00",
    inventory: 7665,
    primaryImageUrl: "http://books.google.com/books/content?id=A5daAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    images: [
    "https://picsum.photos/400/500/?image=105",
    "https://picsum.photos/400/500/?image=106",
    "https://picsum.photos/400/500/?image=107"
    ],
    categories: [
    "Fiction"
    ],
    createdAt: "2018-11-03T18:36:26.072Z",
    updatedAt: "2018-11-03T18:36:26.072Z"
    }
    ]
}
