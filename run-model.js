require('dotenv').config();
const connect = require('./lib/connect');
const mongoose = require('mongoose');

connect();

const Cat = require('./lib/models/cat');

// Cat.create({
//   name: 'Felix',
//   lives: 3
// })
//   .then(createdCat => {
//     console.log(createdCat);
//   })
//   .then(() => {
//     mongoose.disconnect();
//   });

Cat.findByIdAndUpdate(
  '5d88fb5000f58acb5b2f238a',
  { lives: 8 },
  { new: true }  
)
  .then(cats => {
    console.log(cats);
  })
  .then(() => {
    mongoose.disconnect();
  });