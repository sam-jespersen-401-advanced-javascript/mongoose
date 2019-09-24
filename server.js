require('dotenv').config();
require('./lib/connect')();
const express = require('express');
const app = express();
const Language = require('./lib/models/language');

app.use(express.json());

app.get('/api/langs', (req, res, next) => {
  Language.find()
    .then(langs => {
      res.json(langs);
    })
    .catch(next);
});

app.get('/api/langs/:id', (req, res, next) => {
  Language.findById(req.params.id)
    .then(cat => {
      res.json(cat);
    })
    .catch(next);
});

app.post('/api/langs', (req, res, next) => {
  Language.create(req.body)
    .then(cat => {
      res.json(cat);
    })
    .catch(next);
});

app.put('/api/langs/:id', (req, res, next) => {
  Language.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
    .then(cat => {
      res.json(cat);
    })
    .catch(next);
});

app.delete('/api/langs/:id', (req, res, next) => {
  Language.findByIdAndRemove(req.params.id)
    .then(removed => {
      res.json(removed);
    })
    .catch(next);
});

app.listen(3000, () => console.log('server running on 3000'));