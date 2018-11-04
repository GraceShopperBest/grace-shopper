const getProductById = (products, id) => {
  return products.find(product => product.id === id)
}

const orderTotal = (line_items) => {

  return line_items.reduce((total, line_item) => {
    total += (line_item.price * line_item.quantity)
    return total
  }, 0)

}

// converts date format from raw sequelize format to MM-DD-YYYY
const dateFormatter = (date) => {
  const _date = date.slice(0, 10)
  const array = _date.split('-');
  array.push(array.shift())

  return array.join('-');
}

const orderStatusColor = (status) => {

  let color;

  switch(status) {

    case 'CREATED':
      color = 'green'
      break;

    case 'PROCESSING':
      color = 'black'
      break;

    case 'COMPLETED':
      color = 'blue';
      break;

    case 'CANCELLED':
      color = 'red'
      break;
  }

  return { color };
}

const getProduct = (id, products) => {
  return products.find(product => product.id === id)
}

const getCategories = (products) => {
  const categoriesList =  products.reduce(
    (result, product) => {
      product.categories.forEach(category => {
        if (!result.includes(category)) {
          result.push(category);
        }
      });
      return result;
    },
    ['All']
  );
  window.localStorage.setItem('categoriesList', categoriesList)
  return categoriesList;
};

const getPageNum = (productsCount, limit) => {
  return Math.ceil(productsCount/limit);
}

const getRecommendedProducts = (reviews, products) => {
  const fiveStars = reviews.reduce((result, review) => {
    if(review.rating > 4 && !result.includes(review.productId) && result.length < 10){
      result.push(review.productId)
    }
    return result;
  }, [])
  return products.reduce((result, product) => {
    if(fiveStars.includes(product.id)){
      result.push(product)
    }
    return result;
  }, [])
}

const generatePager = (numPages, index) => {
  const pager = [];
  for (let i = 0; i < numPages; i++) {
    pager.push({
      text: i+1,
      value: i,
      selected: i === index
    })
  }
  return pager;
}


const getProductByCategory = (category, products) => {
  if(category === 'All') { return products; }
  return products.reduce(
    (result, product) => {
        if (product.categories.includes(category)) {
          result.push(product);
        }
      return result;
    },
    []
  );
};

const getProductByCategoryCount = (category, products) => {
  console.log(category)
  if(category === 'All') { return products.length; }
  const val = products.reduce(
    (result, product) => {
        if (product.categories.includes(category)) {
          result++;
        }
      return result;
    },
    0
  );
  console.log(val)
  return val;
};


export {
  getProductById,
  orderTotal,
  dateFormatter,
  orderStatusColor,
  getProduct,
  getCategories,
  getProductByCategory,
  getRecommendedProducts,
  generatePager,
  getPageNum,
  getProductByCategoryCount
}
