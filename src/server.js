const express = require('express');
const mongoose = require('mongoose');
const db = require('../config/keys').mongoURI;

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('MongoDB Successfully Connected!');
  })
  .catch(err => {
    console.log(err);
  });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});