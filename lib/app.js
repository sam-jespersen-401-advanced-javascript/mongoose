const express = require('express');
const app = express();

// middleware
const morgan = require('morgan');
const checkConnection = require('./middleware/check-connection');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

// test route
app.get('/hello', (req, res) => {
  res.send('hello express');
});

app.use(checkConnection);

// API ROUTES
const languages = require('./routes/languages');
app.use('/api/languages', languages);

// NOT FOUND
const api404Error = require('./middleware/api-404');
app.use('/api', api404Error);

// ERRORS
const errorHandler = require('./middleware/error-handler');
app.use(errorHandler);


module.exports = app;