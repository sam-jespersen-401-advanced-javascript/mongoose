const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  appearances: {
    pattern: String,
    mainColor: {
      type: String,
      required: true
    }
  },
  lives: {
    type: Number,
    required: true,
    min: 0,
    max: 9
  },
  hasSidekick: {
    type: Boolean,
    default: false
  },
  media: [{
    type: String,
    enum: ['movies', 'comics', 'tv', 'internet']
  }],
  yearIntroduced: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Cat', schema);