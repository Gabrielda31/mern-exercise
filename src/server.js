const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('../config/keys').mongoURI;
const auth = require('./routes/auth');

const app = express();

// The port that the webserver listens to
const port = process.env.PORT || 5000;

// Body parser middleware to parse request bodies
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('MongoDB Successfully Connected!');
  })
  .catch(err => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

//Routes
app.use('/api/auth', auth);