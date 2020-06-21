const jwt = require('jsonwebtoken');
const { secretOrKey } = require('../../config/keys');
const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    
    if(!authorization) {
      res.status(401).json({ error: "Authorization failed." });
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, secretOrKey, (err, payload) => {
      if(err) {
        return res.status(401).json({error: "Authorization failed."});
      }
      const { _id } = payload;
      User.findById(_id).then(userData => {
        req.user = userData;
      });
      next();
    });
} 