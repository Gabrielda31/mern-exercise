const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', (req, res) => {
  res.send("Hello!!");
});

router.post('/register', (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password
  } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(422).json({
      error: "Please fill all the required field."
    });
  }
  User.findOne({
      email: email
    })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({
          error: "User already exists with that email."
        })
      }

      const user = new User({
        email,
        password,
        firstName,
        lastName
      });

      user.save()
        .then(user => {
          res.json({
            message: "Saved successfully."
          });
        })
        .catch(err => {
          console.log(err);
        })
    })
    .catch(err => {
      console.log(err);
    })
});

module.exports = router;