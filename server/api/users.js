const { User, Order, LineItem } = require('../db').models;
const express = require('express');
const router = express.Router();

module.exports = router;

router.get("/", (req, res, next) => {
    User.findAll()
        .then(users => res.send(users))
        .catch(next);
});

router.get("/:id", (req, res, next) => {
    User.findById(req.params.id)
        .then(user => res.send(user))
        .catch(next);
});

router.post("/", (req, res, next) => {
    User.create(req.body)
        .then(user => res.status(201).send(user))
        .catch(next);
});

router.put("/:id", (req, res, next) => {
    User.findById(req.params.id)
        .then(user => user.update(req.body))
        .then(user => res.send(user))
        .catch(next);
});

router.delete("/:id", (req, res, next) => {
    User.findById(req.params.id)
        .then(user => user.destroy())
        .then(() => res.sendStatus(204))
        .catch(next);
});

/** Nested Routes to handle user orders **/

//Gets the user orders
router.get('/:id/orders', (req, res, next) => {
    Order.findAll({
        where: { userId: req.params.id },
        include: [ LineItem ],
        order: [ ['createdAt', 'DESC'] ]
    }).then(orders => res.send(orders))
    .catch(next);
});

//Creates the Cart and adds the first item to it
router.post('/:id/orders', (req, res, next) => {
    Order.create({ type: 'CART', userId: req.params.id })
        .then(order => {
            return LineItem.create({ orderId: order.id, productId: req.body.productId, 
                quantity: req.body.quantity, price: req.body.price })
        }).then((lineItem) => {
            return Order.findById(lineItem.orderId, { include: [ LineItem ] })
        }).then( order => res.status(201).send(order))
        .catch(next);
});

//Updates order: type (CART -> ORDER)
router.put('/:id/orders/:orderId', (req, res, next) => {
    Order.findById(req.params.orderId, { include: [ LineItem ] })
        .then(order => order.update(req.body))
        .then(order => res.send(order))
        .catch(next);
});

//Create line-item in order
router.post('/:id/orders/:orderId/lineItems', (req, res, next) => {
    LineItem.create({ orderId: req.params.orderId, productId: req.body.productId, quantity: req.body.quantity, price: req.body.price })
        .then(lineItem => res.status(201).send(lineItem))
        .catch(next);
});

//Update line-item in order
router.put('/:id/orders/:orderId/lineItems/:lineItemId', (req, res, next) => {
    LineItem.findById(req.params.lineItemId)
        .then(lineItem => lineItem.update(req.body))
        .then(lineItem => res.send(lineItem))
        .catch(next);
});

//Delete the line-item in order
router.delete('/:id/orders/:orderId/lineItems/:lineItemId', (req, res, next) => {
    LineItem.destroy({
        where: {
            orderId: req.params.orderId,
            id: req.params.lineItemId
        }
    }).then(() => res.sendStatus(204))
    .catch(next);
});