require('dotenv').config();
require('./lib/connect')();
const express = require('express');
const app = express();
const Cat = require('./lib/models/cat');

app.use(express.json());

app.get('/api/cats', (req, res, next) => {
  Cat.find()
    .then(cats => {
      res.json(cats);
    })
    .catch(next);
});

app.get('/api/cats/:id', (req, res, next) => {
  Cat.findById(req.params.id)
    .then(cat => {
      res.json(cat);
    })
    .catch(next);
});

app.post('/api/cats', (req, res, next) => {
  Cat.create(req.body)
    .then(cat => {
      res.json(cat);
    })
    .catch(next);
});

app.put('/api/cats/:id', (req, res, next) => {
  Cat.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
    .then(cat => {
      res.json(cat);
    })
    .catch(next);
});

app.delete('/api/cats/:id', (req, res, next) => {
  Cat.findByIdAndRemove(req.params.id)
    .then(removed => {
      res.json(removed);
    })
    .catch(next);
});

app.listen(3000, () => console.log('server running on 3000'));