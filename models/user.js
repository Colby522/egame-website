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
  // forSale: {
  //     type: Boolean,
  //     required: true,
  // },
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
// const Game = mongoose.model('Game', gameSchema)

module.exports = User;
// module.exports = Game
