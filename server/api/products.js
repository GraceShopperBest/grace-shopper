const express = require('express');
const { Product } = require('../db').models;
const router = express.Router();
const conn = require('./../db/conn');
const Op = conn.Sequelize.Op;
module.exports = router;

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => res.send(product))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.status(201).send(product))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => product.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => product.update(req.body))
    .then(product => res.send(product))
    .catch(next);
});

router.get('/categories/:name', (req, res, next) => {
  Product.findByCategory(req.params.name)
    .then(products => res.send(products))
    .catch(next);
});

router.get('/total/count', (req, res, next) => {
  Product.findAndCountAll()
    .then(count => res.send({ count }))
    .catch(next);
});

router.get('/categories/:name/count', (req, res, next) => {
  Product.findAndCountAll({
    where: {
      categories: {
        [Op.contains]: [req.params.name],
      }
    }
  })
    .then(count => res.send({ count }))
    .catch(next);
});

router.get('/page/:index?', (req, res, next) => {
  let index;
  const limit = 10;
  req.params.index ? index = req.params.index*1 : 0;
  const offset = index*limit;
  Product.findAll({
    limit,
    offset
  })
    .then(products => res.send(products))
    .catch(next);
});

router.get('/categories/:name/page/:index?', (req, res, next) => {
  let index;
  const limit = 10;
  req.params.index ? index = req.params.index*1 : 0;
  const offset = index*limit;
  Product.findAll({
    where: {
      categories: {
        [Op.contains]: [req.params.name],
      },
    },
    limit,
    offset
  })
    .then(products => res.send(products))
    .catch(next);
});
