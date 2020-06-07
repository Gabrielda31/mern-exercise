const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const User = mongoose.model()

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', (req, res) => {
  res.send("Hello!!");
});

router.post('/register', (req, res) => {
  console.log(req.body);
  // const {
  //   firstName,
  //   lastName,
  //   email,
  //   password
  // } = req.body;
  // if (!firstName || !lastName || !email || !password) {
  //   return res.status(422).json({
  //     error: "Please fill all the required field."
  //   });
  // }
  // return res.json({
  //   message: "Sign up successfully."
  // });
});

module.exports = router;