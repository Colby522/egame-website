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

router.get('/:userId/:gameId/purchase', async (req, res) => {
    const chosenUser = await User.findById(req.params.userId)
    const chosenGame = await chosenUser.games.id(req.params.gameId)
    res.render('shop/purchase.ejs', {game: chosenGame, user: chosenUser})
})

router.put('/:userId/:gameId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const chosenUser = await User.findById(req.params.userId)
        const chosenGame = await chosenUser.games.id(req.params.gameId)
        if (chosenGame.forSale === 'on') {
            chosenGame.forSale = true
        } else {
            chosenGame.forSale = false
        }
        chosenGame.forSale = false
        await chosenUser.save()
        currentUser.games.push(chosenGame)
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/games`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

module.exports = router