const express = require('express')
const router = express.Router()

const User = require('../models/user.js')

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        res.render('games/index.ejs', {
            games: currentUser.games
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.get('/new', async (req, res) => {
    res.render('games/new.ejs')
})

router.get('/:gameId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const game = currentUser.games.id(req.params.gameId)
        res.render('games/show.ejs', {game: game})
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.get('/:gameId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const game = currentUser.games.id(req.params.gameId)
        res.render('games/edit.ejs', {game: game})
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        if (req.body.forSale === 'on') {
            req.body.forSale = true
        } else {
            req.body.forSale = false
        }
        currentUser.games.push(req.body)
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/games`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.delete('/:gameId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        currentUser.games.id(req.params.gameId).deleteOne()
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/games`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.put('/:gameId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const game = currentUser.games.id(req.params.gameId)
        if (req.body.forSale === 'on') {
            req.body.forSale = true
        } else {
            req.body.forSale = false
        }
        game.set(req.body)
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/games/${req.params.gameId}`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

module.exports = router

