// require('dotenv').config();
// const connect = require('./lib/connect');
// const mongoose = require('mongoose');

// connect();

// const Language = require('./lib/models/language');

// Language.create({
//   name: 'English',
//   region: {
//     name: 'Global',
//     countries: 67
//   },
//   population: 1500000000,
//   isEndangered: false,
//   wordOrder: ['SVO'],
// })
//   .then(createdLang => {
//     console.log(createdLang);
//   })
//   .then(() => {
//     mongoose.disconnect();
//   });

// Language.findByIdAndUpdate(
//   '5d89525983dac2037555c2e5',
//   { population: 1550000000 },
//   { new: true }
// )
//   .then(lang => {
//     console.log(lang);
//   })
//   .then(() => {
//     mongoose.disconnect();
//   });