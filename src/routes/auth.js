const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const keys = require('../../config/keys');
const validateRegisterInput = require('../validator/register');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', (req, res) => {
  res.send("Hello!!");
});

router.post('/register', (req, res) => {
  //Form validation
  const {
    errors,
    isValid
  } = validateRegisterInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  console.log(req.body);
  User.findOne({
      email: req.body.email
    })
    .then(user => {
      if (user) {
        return res.status(400).json({
          message: 'Email already exists.'
        });
      } else {
        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password
        });

        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            // if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => {
                const payload = {
                  id: user.id,
                  firstName: user.firstName,
                  lastName: user.lastName
                };

                //Sign token
                jwt.sign(
                  payload,
                  keys.secretOrKey, {
                    expiresIn: 31556926
                  },
                  (err, token) => {
                    if (err) {
                      console.log(err);
                    } else {
                      res.json({
                        success: true,
                        token: 'Bearer' + token,
                        name: user.firstName + user.lastName
                      });
                    }
                  }
                );
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
});

module.exports = router;