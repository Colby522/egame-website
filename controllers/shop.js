const express = require('express')
const router = express.Router()

const User = require('../models/user.js')

router.get('/', async (req, res) => {
    const users = await User.find()
    res.render('shop/index.ejs', {users: users})
})

router.get('/:userId/:gameId', async (req, res) => {
    const chosenUser = await User.findById(req.params.userId)
    const chosenGame = await chosenUser.games.id(req.params.gameId)
    res.render('shop/show.ejs', {game: chosenGame, user: chosenUser})
})

module.exports = router