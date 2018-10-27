const jwt = require('jwt-simple');
const db = require('../db');
const { User } = db.models;

const isAuthenticated = (req, res, next) => {
    
    const token = req.headers.authorization;
    if(!token) {
        return next();
    }

    let id;
    try {
        id = jwt.decode(token, process.env.JWT_SECRET).id;
    }
    catch(ex) {
        return next({ status: 401 });
    }

    User.findById(id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(next);
  }

  module.exports = { isAuthenticated }