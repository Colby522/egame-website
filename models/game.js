const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    seller_Id: user_Id,
    name: {
        String,
        required: true,
    },
    console: {
        String,
        required: true,
    },
    price: Number,
    goodCondition: Boolean,
    forSale: {
        Boolean,
        required: true,
    },
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game