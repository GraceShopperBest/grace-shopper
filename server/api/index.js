const express = require('express');
const router = express.Router();

module.exports = router;

router.use("/auth", require('./auth'));
router.use("/users", require('./users'));
router.use("/products", require('./products'));
