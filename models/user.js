const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
  },
  console: {
      type: String,
      required: true,
  },
  condition: {
      type: String,
      enum: ['unopened', 'good', 'okay', 'bad', 'doesntWork'],
      required: true,
  },
  forSale: {
      type: Boolean,
  },
  price: {
      type: Number,
      required: true,
  },
})

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  games: [gameSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
