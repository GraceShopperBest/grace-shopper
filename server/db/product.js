const conn = require('./conn');
const Op = conn.Sequelize.Op;

const Product = conn.define('product', {

  title: {
    type: conn.Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  author: {
    type: conn.Sequelize.STRING,
    defaultValue: "Anonymous"
  },
  description: {
    type: conn.Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  price: {
    type: conn.Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      min: 0.01
    }
  },

  inventory: {
    type: conn.Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },

  primaryImageUrl: {
    type: conn.Sequelize.STRING,
    defaultValue: '/public/book-default-cover.jpg',
  },

  images: {
    type: conn.Sequelize.ARRAY(conn.Sequelize.STRING),
  },

  categories: {
    type: conn.Sequelize.ARRAY(conn.Sequelize.STRING),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Product.findByCategory = function(category) {
  return this.findAll({
    where: {
      categories: {
        [Op.contains]: [category],
      },
    },
  });
};

Product.afterValidate(product => {

  if(typeof product.categories === 'string') {
    product.categories = product.categories.split(', ')
  }

  if(typeof product.images === 'string') {
    product.images = product.images.split(', ').filter(image => image !== '')
  }

})

module.exports = Product;
